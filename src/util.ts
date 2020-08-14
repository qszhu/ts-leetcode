import * as path from 'path'
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
