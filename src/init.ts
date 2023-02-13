import { Client } from '../lib/client'
import Project from '../lib/project'

export async function init(titleSlug: string, client: Client) {
  const project = new Project(titleSlug, client)

  project.createQuestionDir()
  await project.readQuestion()
  await project.createTestInput()
  await project.createCode()
  await project.linkLib()
}
