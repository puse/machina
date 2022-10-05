import { mock, MockProxy } from "jest-mock-extended";

import { UserDetails } from "@/twitter-model/UserDetails";
import { obtainingUserDetails } from "./ObtainingUserDetails";
import { UserProfileView } from "./ports/UserProfileView";
import { TwitterBrowser } from "./ports/TwitterBrowser";

describe("Obtaining user details", () => {
  let testProfileView: MockProxy<UserProfileView>;
  let testTwitterBrowser: MockProxy<TwitterBrowser>;

  beforeEach(() => {
    testProfileView = mock<UserProfileView>();
    testTwitterBrowser = mock<TwitterBrowser>();
  });

  test("Working case: @qeri55916757", async () => {
    const testSample: UserDetails = {
      name: "Qeri",
      username: "qeri55916757",
      bio: "He's the best uncle ever! He's also a philanthropist.",
    };

    testProfileView.readName.mockResolvedValue(testSample.name);
    testProfileView.readBio.mockResolvedValue(testSample.bio);

    const obtainedDetails = await obtainingUserDetails(
      { profileView: testProfileView, twitterBrowser: testTwitterBrowser },
      testSample.username
    );

    expect(obtainedDetails).toEqual(testSample);

    // Imagine `open` is necessary to call first for other functions to work
    expect(testProfileView.open.mock.invocationCallOrder).toEqual([1]);
    expect(testProfileView.open).toHaveBeenCalledWith(testSample.username);
  });

  test("User not found", async () => {
    testProfileView.open.mockRejectedValue("UserNotFound");

    expect(() =>
      obtainingUserDetails(
        { profileView: testProfileView, twitterBrowser: testTwitterBrowser },
        "UnknownUsername"
      )
    ).rejects.toEqual("UserNotFound");
  });
});
