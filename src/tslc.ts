#!/usr/bin/env node

import * as commander from 'commander'

import { Client } from '../lib/client'
import { init } from './init'
import { select } from './select'
import { build } from './build'
import { test } from './test'
import { submit } from './submit'
import { login } from './login'
import { upgrade } from './upgrade'
import { loadTitleSlug } from './util'

import pkg = require('../package.json')

const client = new Client()

async function loginCmd() {
  await login(client)
}

async function initCmd(titleSlug?: string) {
  titleSlug = loadTitleSlug(titleSlug)
  await init(titleSlug, client)
}

async function selectCmd(n: number, titleSlug?: string) {
  titleSlug = loadTitleSlug(titleSlug)
  await select(titleSlug, n)
}

async function buildCmd(titleSlug?: string) {
  titleSlug = loadTitleSlug(titleSlug)
  await build(titleSlug, client)
}

async function testCmd(titleSlug?: string) {
  titleSlug = loadTitleSlug(titleSlug)
  await test(titleSlug, client)
}

async function submitCmd(titleSlug?: string) {
  titleSlug = loadTitleSlug(titleSlug)
  await submit(titleSlug, client)
}

async function upgradeCmd() {
  await upgrade()
}

async function main() {
  const program = new commander.Command()
  program.version(pkg.version)
  program.command('login').description('login with username and password').action(loginCmd)
  program
    .command('init [questionSlug]')
    .description('create new solution for question')
    .action(initCmd)
  program
    .command('select <solutionNo> [questionSlug]')
    .description('select current solution for question')
    .action(selectCmd)
  program
    .command('build [questionSlug]')
    .description('build solution for question')
    .action(buildCmd)
  program.command('test [questionSlug]').description('test solution for question').action(testCmd)
  program
    .command('submit [questionSlug]')
    .description('submit solution for question')
    .action(submitCmd)
  program.command('upgrade').description('upgrade self').action(upgradeCmd)
  program.parse(process.argv)
}

if (require.main === module) {
  main().catch(console.error)
}
