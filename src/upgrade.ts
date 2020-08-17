const { spawn } = require('child_process')

import pkg = require('../package.json')

export async function upgrade() {
  spawn('npm', ['i', '-g', pkg.name], {
    stdio: [process.stdin, process.stdout, process.stderr],
  })
}
