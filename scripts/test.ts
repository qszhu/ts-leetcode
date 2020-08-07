import { Client } from '../lib/client'
import Project from '../lib/project'
import Config from '../lib/config'

function checkAnswer(expected: string[], actual: string[]) {
  if (expected.length !== actual.length) return false
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) return false
  }
  return true
}

async function main(titleSlug: string) {
  const config = Config.load()
  titleSlug = titleSlug || config.currentTitleSlug
  if (!titleSlug) return
  config.currentTitleSlug = titleSlug

  const client = new Client()
  const project = new Project(titleSlug, client)

  await project.readQuestion()
  const { expectedRes, actualRes } = await project.test()

  const { code_answer: actualAnswer, code_output: actualOutput } = actualRes
  const { code_answer: expectedAnswer, code_output: expectedOutput } = expectedRes
  if (!checkAnswer(expectedAnswer, actualAnswer)) {
    console.error('FAILED!', 'expected:', expectedAnswer, 'actual:', actualAnswer)
    process.exit(1)
  }

  console.log('SUCCESS')
}

if (require.main === module) {
  main(process.argv[2]).catch(console.error)
}
