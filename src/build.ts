import * as shell from 'shelljs'

import { Client } from '../lib/client'
import Project from '../lib/project'

// const TARGET = 'node16.13.2'

function run(cmd: string) {
  console.log(cmd)
  const res = shell.exec(cmd)
  if (res.code !== 0) {
    shell.exit(res.code)
  }
}

export async function build(titleSlug: string, client: Client) {
  const project = new Project(titleSlug, client)
  run(`nim js -d:nodejs -d:danger -o:${project.solutionFn} ${project.codeFn}`)

  // await project.readQuestion()

  // run(`esbuild ${project.solutionFn} --bundle --minify-syntax --platform=node --target=${TARGET} --outfile=${project.solutionFn} --allow-overwrite`)
}
