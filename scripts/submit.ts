import { Client, CheckSubmissionResp } from '../lib/client'
import Project from '../lib/project'
import Config from '../lib/config'

function printResult(res: CheckSubmissionResp) {
  const formatPercent = (percent: number) => `${percent.toFixed(2)}%`

  console.log(res.status_msg)
  console.log(`Runtime: ${res.status_runtime}, ${formatPercent(res.runtime_percentile)}`)
  console.log(`Memory: ${res.status_memory}, ${formatPercent(res.memory_percentile)}`)
}

async function main(titleSlug: string) {
  const config = Config.load()
  titleSlug = titleSlug || config.currentTitleSlug
  if (!titleSlug) return
  config.currentTitleSlug = titleSlug

  const client = new Client()
  const project = new Project(titleSlug, client)

  await project.readQuestion()
  const res = await project.submit()
  printResult(res)
}

if (require.main === module) {
  main(process.argv[2]).catch(console.error)
}
