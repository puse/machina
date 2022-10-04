import { RunnerCommand } from "../RunnerCommand";

import { obtainingUserDetails } from "../../ObtainingUserDetails.js";
import { UserProfileViewAdapter } from "../../PlaywrightAdapters/UserProfileViewAdapter.js";

export const details: RunnerCommand = {
  name: "details",
  callback: async (context, ...input) => {
    const page = await context.browserContext.newPage();
    const profileView = new UserProfileViewAdapter(page);

    const username = input[0];
    if (!username) {
      throw new Error("Username is missing");
    }

    return obtainingUserDetails(profileView, username);
  },
};
