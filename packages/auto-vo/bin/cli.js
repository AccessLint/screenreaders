#!/usr/bin/env node

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { run } = require('../lib/index.js');
const argv = yargs(hideBin(process.argv)).argv;

run(argv);
