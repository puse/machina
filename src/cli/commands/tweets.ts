import { RunnerCommand } from "../RunnerCommand";

import { collectingUserTweets } from "../../twitter-api/CollectingUserTweets.js";
import { TwitterBrowserAdapter } from "../../twitter-adapter-playwright/TwitterBrowserAdapter";

export const tweets: RunnerCommand = {
  name: "tweets",
  callback: async (context, ...input) => {
    const twitterBrowser = new TwitterBrowserAdapter(context.browserContext);

    const username = input[0];
    if (!username) {
      throw new Error("Username is missing");
    }

    return collectingUserTweets({ twitterBrowser }, username);
  },
};
