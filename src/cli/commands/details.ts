import { RunnerCommand } from "../RunnerCommand";

import { obtainingUserDetails } from "../../ObtainingUserDetails.js";
import { UserProfileViewAdapter } from "../../PlaywrightAdapters/UserProfileViewAdapter.js";

export const details: RunnerCommand = {
  name: "details",
  callback: async ({ browserContext }, ...input) => {
    const profileView = new UserProfileViewAdapter(browserContext);

    const username = input[0];
    if (!username) {
      throw new Error("Username is missing");
    }

    return obtainingUserDetails(profileView, username);
  },
};
