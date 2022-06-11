#!/usr/bin/env node

const { cli } = require('../lib/cli.js');

const argv = process.argv.slice(2);

cli(argv);
