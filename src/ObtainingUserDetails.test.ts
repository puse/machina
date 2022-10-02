describe("ObtainTwitterUserDetails", () => {
  test("Case: @qeri55916757", async () => {
    type UserDetails = {
      name: string;
      username: string;
      imageUrl?: string;
      bio?: string;
    };
    type ObtainingUserDetails = (username: string) => Promise<UserDetails>;

    const testDetails: UserDetails = {
      name: "Qeri",
      username: "qeri55916757",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1575489862832361473/HEzvhPUK_400x400.jpg",
      bio: "He's the best uncle ever! He's always up for a good time. He's also a philanthropist.",
    };

    const obtainUserDetails: ObtainingUserDetails = async (
      username
    ): Promise<UserDetails> => {
      throw Error("Not implemented");
    };

    const obtainedDetails = await obtainUserDetails(testDetails.username);

    expect(obtainedDetails).toEqual(testDetails);
  });
});
