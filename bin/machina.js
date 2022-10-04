#!/usr/bin/env node

import meow from "meow";

const helpText = `
	Usage
	  $ machina <command> <input>

	Options
	  --headless  Run browser in headless mode

	Examples
	  $ machina tweets shakira
	  $ machina details shakira --no-headless
`;

const cli = meow(helpText, {
  importMeta: import.meta,
  flags: {
    headless: {
      type: "boolean",
      default: true
    }
  }
});

console.log(cli.input, cli.flags);
