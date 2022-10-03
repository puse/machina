import { mock, MockProxy } from "jest-mock-extended";

import {
  BlankUserProfileView,
  obtainingUserDetails,
  UserDetails,
  UserProfileView,
} from "./ObtainingUserDetails";

describe("Obtaining user details", () => {
  let testBlankProfileView: MockProxy<BlankUserProfileView>;
  let testProfileView: MockProxy<UserProfileView>;

  beforeEach(() => {
    testBlankProfileView = mock<BlankUserProfileView>();
    testProfileView = mock<UserProfileView>();
  });

  test("Working case: @qeri55916757", async () => {
    const testSample: UserDetails = {
      name: "Qeri",
      username: "qeri55916757",
      bio: "He's the best uncle ever! He's also a philanthropist.",
    };

    testBlankProfileView.open.mockResolvedValue(testProfileView);

    testProfileView.readName.mockResolvedValue(testSample.name);
    testProfileView.readBio.mockResolvedValue(testSample.bio);

    const obtainedDetails = await obtainingUserDetails(
      testBlankProfileView,
      testSample.username
    );

    expect(obtainedDetails).toEqual(testSample);

    // Imagine `open` is necessary to call first for other functions to work
    expect(testBlankProfileView.open.mock.invocationCallOrder).toEqual([1]);
    expect(testBlankProfileView.open).toHaveBeenCalledWith(testSample.username);
  });

  test("User not found", async () => {
    testBlankProfileView.open.mockRejectedValue("UserNotFound");

    expect(() =>
      obtainingUserDetails(testBlankProfileView, "UnknownUsername")
    ).rejects.toEqual("UserNotFound");
  });
});
