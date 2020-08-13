import { Client } from '../lib/client'
import Project from '../lib/project'

function checkAnswer(expected: string[], actual: string[]) {
  if (expected.length !== actual.length) return false
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) return false
  }
  return true
}

export async function test(titleSlug: string, client: Client) {
  const project = new Project(titleSlug, client)

  await project.readQuestion()
  const { expectedRes, actualRes } = await project.test()

  const { code_answer: actualAnswer, code_output: actualOutput } = actualRes
  const { code_answer: expectedAnswer } = expectedRes

  actualOutput.forEach((o) => console.log(o))

  if (!checkAnswer(expectedAnswer, actualAnswer)) {
    console.error('FAILED!', 'expected:', expectedAnswer, 'actual:', actualAnswer)
    process.exit(1)
  }

  console.log('SUCCESS')
}
