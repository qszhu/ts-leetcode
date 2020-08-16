import * as fs from 'fs'
import * as path from 'path'

import { readFileSync } from './utils'

const CONFIG_FN = '.tslcrc'
const KEY_LEETCODE_SESSION = 'leetcodeSession'
const KEY_MODE = 'mode'
const KEY_CURRENT_TITLE_SLUG = 'currentTitleSlug'
const KEY_PUPPETEER_BROWSER_PATH = 'browserPath'

function getConfigFn() {
  return path.join(process.cwd(), CONFIG_FN)
}

export default class Config {
  static load() {
    const configFn = getConfigFn()
    if (fs.existsSync(configFn)) {
      return new Config(JSON.parse(readFileSync(configFn)))
    }
    return new Config({})
  }

  constructor(private data: { [key: string]: any } = {}) {}

  get currentTitleSlug() {
    return this.data[KEY_CURRENT_TITLE_SLUG]
  }

  set currentTitleSlug(titleSlug: string) {
    this.data[KEY_CURRENT_TITLE_SLUG] = titleSlug
    this.save()
  }

  get leetcodeSession() {
    return this.data[KEY_LEETCODE_SESSION]
  }

  set leetcodeSession(session: string) {
    this.data[KEY_LEETCODE_SESSION] = session
    this.save()
  }

  get mode() {
    return this.data[KEY_MODE]
  }

  set mode(mode: string) {
    this.data[KEY_MODE] = mode
    this.save()
  }

  get browserPath() {
    return this.data[KEY_PUPPETEER_BROWSER_PATH]
  }

  set browserPath(path: string) {
    this.data[KEY_PUPPETEER_BROWSER_PATH] = path
    this.save()
  }

  save() {
    fs.writeFileSync(getConfigFn(), JSON.stringify(this.data, null, 2))
  }
}
