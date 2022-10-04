import { RunnerCommand } from "../RunnerCommand";

import { collectingUserTweets } from "../../CollectingUserTweets.js";
import { UserTweetsViewAdapter } from "../../PlaywrightAdapters/UserTweetsViewAdapter.js";

export const tweets: RunnerCommand = {
  name: "tweets",
  callback: async ({ browserContext }, ...input) => {
    const tweetsView = new UserTweetsViewAdapter(browserContext);

    const username = input[0];
    if (!username) {
      throw new Error("Username is missing");
    }

    return collectingUserTweets(tweetsView, username);
  },
};
