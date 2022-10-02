import { mock, MockProxy } from "jest-mock-extended";

import { UserProfileView } from "./UserProfileView";
import { obtainingUserDetails, UserDetails } from "./ObtainingUserDetails";

describe("Obtaining user details", () => {
  let testProfileView: MockProxy<UserProfileView>;

  beforeEach(() => {
    testProfileView = mock<UserProfileView>();
  });

  test("Working case: @qeri55916757", async () => {
    const testSample: UserDetails = {
      name: "Qeri",
      username: "qeri55916757",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1575489862832361473/HEzvhPUK_400x400.jpg",
      bio: "He's the best uncle ever! He's always up for a good time. He's also a philanthropist.",
    };

    testProfileView.readName.mockResolvedValue(testSample.name);
    testProfileView.readImageUrl.mockResolvedValue(testSample.imageUrl);
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
