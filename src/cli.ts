import { chromium, Page } from "playwright";
import { collectingUserTweets } from "./CollectingUserTweets.js";
import { obtainingUserDetails } from "./ObtainingUserDetails.js";
import { UserTweetsViewAdapter } from "./PlaywrightAdapters/UserTweetsViewAdapter.js";
import { UserProfileViewAdapter } from "./PlaywrightAdapters/UserProfileViewAdapter.js";

const collectTweets = async (page: Page, ...params: string[]) => {
  const tweetView = new UserTweetsViewAdapter(page);
  const username = params[1];
  if (!username) {
    throw new Error("Invalid input");
  }
  return await collectingUserTweets(tweetView, username);
};

const obtainDetails = async (page: Page, ...params: string[]) => {
  const detailsView = new UserProfileViewAdapter(page);
  const username = params[0];
  if (!username) {
    throw new Error("Not implemented");
  }
  return await obtainingUserDetails(detailsView, username);
};

export const runner = async (
  input: string[],
  flags: Record<string, unknown>
) => {
  const browser = await chromium.launch(flags);
  const browserContext = await browser.newContext();
  const blankPage = await browserContext.newPage();

  let command: Function | null;

  switch (input.shift()) {
    case "tweets":
      command = collectTweets;
      break;
    case "details":
      command = obtainDetails;
      break;
    default:
      command = null;
  }

  if (!command) {
    console.error("Unknown command");
  } else {
    const result = await command(blankPage, ...input);
    console.log(result);
  }

  await browserContext.close();
  await browser.close();
};
