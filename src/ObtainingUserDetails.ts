export type UserDetails = {
  name: string;
  username: string;
  bio?: string;
};

export type BlankUserProfileView = {
  open: (username: string) => Promise<UserProfileView>;
};

export type UserProfileView = {
  readName: () => Promise<string>;
  readBio: () => Promise<string | undefined>;
};

export const obtainingUserDetails = async (
  blankProfileView: BlankUserProfileView,
  username: string
): Promise<UserDetails> => {
  const profileView = await blankProfileView.open(username);

  const name = await profileView.readName();
  const bio = await profileView.readBio();

  return { username, name, bio };
};
