#!/usr/bin/env node

const { program } = require('commander')

const acclaimed = require('./index')

program
  .command('acclaimed')
  .action(() => {
    acclaimed.critical()
  })

program.parse();
