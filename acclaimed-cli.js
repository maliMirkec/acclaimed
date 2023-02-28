#!/usr/bin/env node

const { program } = require('commander')

const acclaimed = require('./index')

program
  .action(() => {
    acclaimed.critical()
  })

program.parse();
