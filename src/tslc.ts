#!/usr/bin/env node

require('dotenv-safe').config()

import pkg = require('../package.json')
import * as commander from 'commander'

import { Client } from '../lib/client'
import { init } from './init'
import { select } from './select'
import { build } from './build'
import { test } from './test'
import { submit } from './submit'

const client = new Client()

async function initCmd(titleSlug: string) {
  await init(titleSlug, client)
}

async function selectCmd(titleSlug: string, n: number) {
  await select(titleSlug, n)
}

async function buildCmd(titleSlug: string) {
  await build(titleSlug, client)
}

async function testCmd(titleSlug: string) {
  await test(titleSlug, client)
}

async function submitCmd(titleSlug: string) {
  await submit(titleSlug, client)
}

async function main() {
  const program = new commander.Command()
  program.version(pkg.version)
  program
    .command('init <questionSlug>')
    .description('create new solution for question')
    .action(initCmd)
  program
    .command('select <questionSlug> <solutionNo>')
    .description('select solution for question')
    .action(selectCmd)
  program
    .command('build <questionSlug>')
    .description('build solution for question')
    .action(buildCmd)
  program.command('test <questionSlug>').description('test solution for question').action(testCmd)
  program
    .command('submit <questionSlug>')
    .description('submit solution for question')
    .action(submitCmd)
  program.parse(process.argv)
}

if (require.main === module) {
  main().catch(console.error)
}
