import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

import * as Handlebars from 'handlebars'

export function getTemplate(tmplFn: string) {
  const tmplStr = fs.readFileSync(path.join(__dirname, '..', '..', tmplFn)).toString()
  return Handlebars.compile(tmplStr, { noEscape: true })
}

export function readFileSync(fn: string) {
  return fs.readFileSync(fn).toString()
}

export async function writeFile(fn: string, content: string) {
  const res = await promisify(fs.writeFile)(fn, content)
  return res
}
