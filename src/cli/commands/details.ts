import { RunnerCommand } from "../RunnerCommand";

import { obtainingUserDetails } from "../../twitter-api/ObtainingUserDetails.js";
import { TwitterBrowserAdapter } from "../../twitter-adapter-playwright/TwitterBrowserAdapter";

export const details: RunnerCommand = {
  name: "details",
  callback: async (context, ...input) => {
    const twitterBrowser = new TwitterBrowserAdapter(context.browserContext);

    const username = input[0];
    if (!username) {
      throw new Error("Username is missing");
    }

    return obtainingUserDetails({ twitterBrowser }, username);
  },
};
