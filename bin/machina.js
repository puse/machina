#!/usr/bin/env node

import meow from "meow";
import { run } from "../build/cli/cli.js";

const helpText = `
	Usage
	  $ machina <command> <input>

	Options
	  --headless  Run browser in headless mode

	Examples
	  $ machina tweets shakira
	  $ machina details shakira --no-headless
`;

const { input, flags } = meow(helpText, {
  importMeta: import.meta,
  flags: {
    headless: {
      type: "boolean",
      default: true,
    },
  },
});

run(input, flags);
