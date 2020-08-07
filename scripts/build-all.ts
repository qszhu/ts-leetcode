import * as path from 'path'

import * as globby from 'globby'

import { run } from './util'

const { QUESTIONS_ROOT_DIR } = process.env

async function main() {
  const questions = globby
    .sync(`${QUESTIONS_ROOT_DIR}`, { onlyDirectories: true })
    .map((p) => path.basename(p))

  questions.forEach((q) => run(`npm run build ${q}`))
}

if (require.main === module) {
  main().catch(console.error)
}
