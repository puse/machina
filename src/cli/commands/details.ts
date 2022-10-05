import { RunnerCommand } from "../RunnerCommand";

import { obtainingUserDetails } from "../../twitter-api/ObtainingUserDetails.js";

export const details: RunnerCommand = {
  name: "details",
  callback: async ({ twitterBrowser }, ...input) => {
    const username = input[0];
    if (!username) {
      throw new Error("Username is missing");
    }

    return obtainingUserDetails({ twitterBrowser }, username);
  },
};
