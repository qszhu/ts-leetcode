import { Client } from '../lib/client'
import Project from '../lib/project'
import Config from '../lib/config'

async function main(titleSlug: string) {
  const config = Config.load()
  titleSlug = titleSlug || config.currentTitleSlug
  if (!titleSlug) return
  config.currentTitleSlug = titleSlug

  const client = new Client()
  const project = new Project(titleSlug, client)

  project.createQuestionDir()
  await project.readQuestion()
  await project.createTestInput()
  await project.createCode()
  await project.createTsConfig()
}

if (require.main === module) {
  main(process.argv[2]).catch(console.error)
}
