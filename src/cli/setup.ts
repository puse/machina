import { chromium } from "playwright";
import { RunnerContext } from "./RunnerContext.js";
import { TwitterBrowserAdapter } from "../twitter-adapter-playwright/TwitterBrowserAdapter.js";

export const setupRunnerContext = async (
  flags: Record<string, unknown>
): Promise<RunnerContext> => {
  const browser = await chromium.launch(flags);
  const browserContext = await browser.newContext();

  const twitterBrowser = new TwitterBrowserAdapter(browserContext);

  return { browser, browserContext, twitterBrowser };
};
