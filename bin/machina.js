#!/usr/bin/env node
const parseArgs = require("yargs-parser"); // eslint-disable-line @typescript-eslint/no-var-requires
const { run } = require("../build/cli/cli"); // eslint-disable-line @typescript-eslint/no-var-requires

const { _: input, ...flags } = parseArgs(process.argv.slice(2));

run(input, flags);
