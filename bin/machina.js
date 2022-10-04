#!/usr/bin/env node

import meow from "meow";
import { runner } from "../build/cli.js";

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
      default: true,
    },
  },
});

runner(cli.input, cli.flags);
