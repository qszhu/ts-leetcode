import * as shell from 'shelljs'

export function run(cmd: string) {
  const res = shell.exec(cmd)
  if (res.code !== 0) {
    shell.exit(res.code)
  }
}
