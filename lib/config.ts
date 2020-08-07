import * as fs from 'fs'

const CONFIG_FN = 'config.json'

export default class Config {
  static load() {
    if (fs.existsSync(CONFIG_FN)) {
      return new Config(JSON.parse(fs.readFileSync(CONFIG_FN).toString()))
    }
    return new Config({})
  }

  constructor(private data: { [key: string]: any } = {}) {}

  get currentTitleSlug() {
    return this.data['currentTitleSlug']
  }

  set currentTitleSlug(titleSlug: string) {
    this.data['currentTitleSlug'] = titleSlug
    this.save()
  }

  save() {
    fs.writeFileSync(CONFIG_FN, JSON.stringify(this.data, null, 2))
  }
}
