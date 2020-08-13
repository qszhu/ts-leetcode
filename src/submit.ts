import { Client, CheckSubmissionResp } from '../lib/client'
import Project from '../lib/project'

function printResult(res: CheckSubmissionResp) {
  const formatPercent = (percent: number) => `${percent.toFixed(2)}%`

  console.log(res.status_msg)
  console.log(`Runtime: ${res.status_runtime}, ${formatPercent(res.runtime_percentile)}`)
  console.log(`Memory: ${res.status_memory}, ${formatPercent(res.memory_percentile)}`)
}

export async function submit(titleSlug: string, client: Client) {
  const project = new Project(titleSlug, client)

  await project.readQuestion()
  const res = await project.submit()
  printResult(res)
}
