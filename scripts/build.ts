import Project from '../lib/project'
import Config from '../lib/config'
import { run } from './util'

const { MINIFY, OBFUSCATE } = process.env

async function main(titleSlug: string) {
  const config = Config.load()
  titleSlug = titleSlug || config.currentTitleSlug
  if (!titleSlug) return
  config.currentTitleSlug = titleSlug

  const project = new Project(titleSlug, undefined)

  run(`npx tsc -p ${project.questionDir}`)

  if (MINIFY === 'true') {
    run(`npx terser ${project.solutionFn} --config-file minify.json --output ${project.solutionFn}`)
  }

  if (OBFUSCATE === 'true') {
    run(
      `npx javascript-obfuscator ${project.solutionFn} --config javascript-obfuscator.json --output ${project.solutionFn}`
    )
  }
}

if (require.main === module) {
  main(process.argv[2]).catch(console.error)
}
