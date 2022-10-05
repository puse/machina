import { mock, MockProxy } from "jest-mock-extended";

import { obtainingUserDetails } from "./ObtainingUserDetails";
import { UserProfileView } from "./twitter-api/ports/UserProfileView";
import { UserDetails } from "./twitter-model/UserDetails";

describe("Obtaining user details", () => {
  let testProfileView: MockProxy<UserProfileView>;

  beforeEach(() => {
    testProfileView = mock<UserProfileView>();
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
      testProfileView,
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
      obtainingUserDetails(testProfileView, "UnknownUsername")
    ).rejects.toEqual("UserNotFound");
  });
});
