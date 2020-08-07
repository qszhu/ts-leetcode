import Project from '../lib/project'
import Config from '../lib/config'

async function main(n: number) {
  const config = Config.load()
  const titleSlug = config.currentTitleSlug
  if (!titleSlug || !n) return

  const project = new Project(titleSlug, undefined)
  project.selectCode(n)
}

if (require.main === module) {
  main(Number(process.argv[2])).catch(console.error)
}
