import * as path from 'path'

import * as shell from 'shelljs'

import { Client } from '../lib/client'
import Project from '../lib/project'

function run(cmd: string) {
  const res = shell.exec(cmd)
  if (res.code !== 0) {
    shell.exit(res.code)
  }
}

export async function build(titleSlug: string, client: Client) {
  const { MODE } = process.env

  const project = new Project(titleSlug, client)

  await project.readQuestion()

  const configFn = path.join(process.cwd(), 'webpack.config.js')
  const cmd = `npx webpack --config=${configFn} --mode=${MODE} --env.dir=${project.questionDir} --env.library=${project.libraryName}`
  run(cmd)
}
