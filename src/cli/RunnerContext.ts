import { Browser, BrowserContext } from "playwright";

export type RunnerContext = {
  browser: Browser;
  browserContext: BrowserContext;
};
