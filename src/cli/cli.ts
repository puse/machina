import { chromium } from "playwright";
import { RunnerContext } from "./RunnerContext.js";
import { commands } from "./commands/index.js";

const setupRunnerContext = async (
  flags: Record<string, unknown>
): Promise<RunnerContext> => {
  const browser = await chromium.launch(flags);
  const browserContext = await browser.newContext();

  return { browser, browserContext };
};

const tearDownRunnerContext = async (context: RunnerContext): Promise<void> => {
  await context.browserContext.close();
  await context.browser.close();
};

const invokeCommand = async (
  cmd: string,
  context: RunnerContext,
  input: string[]
): Promise<unknown> => {
  const command = commands.find(({ name }) => cmd === name);

  if (!command) {
    const unknownCommand = new Error(`Unknown Command: ${cmd}`);
    return Promise.reject(unknownCommand);
  } else {
    return command.callback(context, ...input);
  }
};

export const run = async (input: string[], flags: Record<string, unknown>) => {
  const context = await setupRunnerContext(flags);

  const exitWithError = async (error: Error | string): Promise<void> => {
    const message = typeof error === "string" ? error : error.message;
    console.error(message);
    process.exit(1);
  };

  // first argument is the sub-command
  const cmd = input.shift();
  if (!cmd) {
    return exitWithError("Command not specified");
  }

  const result = await invokeCommand(cmd, context, input).catch(exitWithError);
  console.log(result);

  await tearDownRunnerContext(context);
};
