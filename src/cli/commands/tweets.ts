import { RunnerCommand } from "../RunnerCommand";

import { collectingUserTweets } from "../../twitter-api/CollectingUserTweets.js";

export const tweets: RunnerCommand = {
  name: "tweets",
  callback: async ({ twitterBrowser }, ...input) => {
    const username = input[0];
    if (!username) {
      throw new Error("Username is missing");
    }

    return collectingUserTweets({ twitterBrowser }, username);
  },
};
