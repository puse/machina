import { Browser, BrowserContext } from "playwright";
import { TwitterBrowser } from "../twitter-api/ports/TwitterBrowser.js";

export type RunnerContext = {
  browser: Browser;
  browserContext: BrowserContext;
  twitterBrowser: TwitterBrowser;
};
