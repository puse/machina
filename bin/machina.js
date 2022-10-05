#!/usr/bin/env node
const parseArgs = require("yargs-parser"); // eslint-disable-line @typescript-eslint/no-var-requires
const { run } = require("../build/cli/cli"); // eslint-disable-line @typescript-eslint/no-var-requires

const { _: input, ...flags } = parseArgs(process.argv.slice(2));

const helpText = `
	Usage
	  $ machina <command> <input>
	Options
	  --headless  Run browser in headless mode
	Examples
	  $ machina tweets shakira
	  $ machina details shakira --no-headless
`;
if (input.length === 0) {
  console.log(helpText);
  process.exit(1);
}

run(input, flags);
