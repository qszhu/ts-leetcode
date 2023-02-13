import * as fs from 'fs'
import * as path from 'path'

import * as globby from 'globby'
import * as shell from 'shelljs'

import { Client, QuestionData } from './client'
import { genCode } from './codeGen'
import { readFileSync, writeFile } from './utils'

const CODE_FN = 'solution.nim'
const TYPES_FN = 'types.nim'
const SOLUTION_FN = 'solution.js'
const TEST_INPUT_FN = 'input'

interface Options {
  questionsRootDir: string
}

function getEnvOptions(): Options {
  return {
    questionsRootDir: path.join(process.cwd(), 'questions'),
  }
}

export default class Project {
  private options: Options
  private question: QuestionData

  constructor(private titleSlug: string, private client: Client, options?: Options) {
    this.options = Object.assign(getEnvOptions(), options)
  }

  async readQuestion() {
    const {
      data: { question },
    } = await this.client.getQuestionData(this.titleSlug)
    this.question = question
  }

  get questionDir() {
    return path.join(this.options.questionsRootDir, this.titleSlug)
  }

  get testInputFn() {
    return path.join(this.questionDir, TEST_INPUT_FN)
  }

  get testInput() {
    return readFileSync(this.testInputFn)
  }

  get codeFn() {
    return path.join(this.questionDir, CODE_FN)
  }

  get typesFn() {
    return path.join(this.questionDir, TYPES_FN)
  }

  private addNumber(fn: string, n: number) {
    const p = fn.lastIndexOf('.')
    return `${fn.substring(0, p)}${n}${fn.substring(p)}`
  }

  private getNumber(fn: string) {
    if (fn.match(/solution(\d+).nim$/)) {
      return Number(RegExp.$1)
    }
    return 0
  }

  private nextNumber() {
    const fns = globby.sync(`${this.questionDir}/solution*.nim`)
    if (fns.length === 0) return 1
    return Math.max(...fns.map((fn) => this.getNumber(fn))) + 1
  }

  get solution() {
    return readFileSync(this.solutionFn)
  }

  get solutionFn() {
    return path.join(this.questionDir, SOLUTION_FN)
  }

  createQuestionDir() {
    shell.mkdir('-p', this.questionDir)
  }

  async createTestInput() {
    if (fs.existsSync(this.testInputFn)) return

    await writeFile(this.testInputFn, this.question.sampleTestCase)
  }

  get libraryName() {
    const metaData = JSON.parse(this.question.metaData)
    return metaData.name || metaData.classname
  }

  async createCode() {
    const next = this.nextNumber()
    const codeFn = this.addNumber(this.codeFn, next)

    const code = genCode(this.question)
    await writeFile(codeFn, code)
    this.selectCode(next)
  }

  async linkLib() {
    if (fs.existsSync(this.typesFn)) return
    shell.ln('-sf', '../../types.nim', this.typesFn)
  }

  selectCode(n: number) {
    const codeFn = this.addNumber(this.codeFn, n)
    shell.ln('-sf', path.basename(codeFn), this.codeFn)
  }

  async test() {
    const { questionId, judgeType } = this.question

    const { interpret_id, interpret_expected_id } = await this.client.interpret(
      this.titleSlug,
      questionId,
      this.solution,
      this.testInput,
      judgeType
    )

    const actualRes = await this.client.waitInterpretResult(this.titleSlug, interpret_id)
    if (!actualRes.run_success) {
      console.error(actualRes)
      return
    }

    const expectedRes = await this.client.waitInterpretResult(this.titleSlug, interpret_expected_id)
    if (!expectedRes.run_success) {
      console.error(expectedRes)
      return
    }

    return { expectedRes, actualRes }
  }

  async submit() {
    const { questionId } = this.question

    const { submission_id } = await this.client.submit(this.titleSlug, questionId, this.solution)

    const res = await this.client.waitSubmissionResult(this.titleSlug, submission_id)
    return res
  }
}
