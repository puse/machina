import { mock, MockProxy } from "jest-mock-extended";

import { UserDetails } from "@/twitter-model/UserDetails";
import { obtainingUserDetails } from "./ObtainingUserDetails";
import { UserProfileView } from "./ports/UserProfileView";
import { TwitterBrowser } from "./ports/TwitterBrowser";

describe("Obtaining user details", () => {
  let twitterBrowser: MockProxy<TwitterBrowser>;
  let profileView: MockProxy<UserProfileView>;

  beforeEach(() => {
    twitterBrowser = mock<TwitterBrowser>();

    profileView = mock<UserProfileView>();
    twitterBrowser.openUserProfile.mockResolvedValueOnce(profileView);
  });

  test("Working case: @qeri55916757", async () => {
    const testSample: UserDetails = {
      name: "Qeri",
      username: "qeri55916757",
      bio: "He's the best uncle ever! He's also a philanthropist.",
    };

    profileView.readName.mockResolvedValue(testSample.name);
    profileView.readBio.mockResolvedValue(testSample.bio);

    const obtainedDetails = await obtainingUserDetails(
      { twitterBrowser },
      testSample.username
    );

    expect(obtainedDetails).toEqual(testSample);
  });

  test.todo("User not found");
});
