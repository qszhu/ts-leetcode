import * as path from 'path'
import * as shell from 'shelljs'
import Config from '../lib/config'

export function loadTitleSlug(titleSlug?: string) {
  const config = Config.load()
  if (titleSlug) {
    titleSlug = path.basename(titleSlug)
    config.currentTitleSlug = titleSlug
  } else {
    titleSlug = config.currentTitleSlug
  }
  if (!titleSlug) throw new Error('TitleSlug missing')
  return titleSlug
}

export function titleSlugFromUrl(url: string): string {
  url.match(/problems\/([^\/]+).*/g)
  return RegExp.$1
}

export function run(cmd: string) {
  console.log(cmd)
  const res = shell.exec(cmd)
  if (res.code !== 0) {
    shell.exit(res.code)
  }
}
