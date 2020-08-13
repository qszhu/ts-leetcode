import Project from '../lib/project'

export async function select(titleSlug: string, n: number) {
  const project = new Project(titleSlug, undefined)
  project.selectCode(n)
}
