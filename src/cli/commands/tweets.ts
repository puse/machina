import { RunnerCommand } from "../RunnerCommand";

import { UserTweetsViewAdapter } from "@/twitter-adapter-playwright/UserTweetsViewAdapter.js";
import { collectingUserTweets } from "@/twitter-api/CollectingUserTweets.js";

export const tweets: RunnerCommand = {
  name: "tweets",
  callback: async (context, ...input) => {
    const page = await context.browserContext.newPage();
    const tweetsView = new UserTweetsViewAdapter(page);

    const username = input[0];
    if (!username) {
      throw new Error("Username is missing");
    }

    return collectingUserTweets(tweetsView, username);
  },
};
