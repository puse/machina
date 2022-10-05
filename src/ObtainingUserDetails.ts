import { UserDetails } from "./twitter-model/UserDetails";

export type UserProfileView = {
  open: (username: string) => Promise<void>;
  readName: () => Promise<string>;
  readBio: () => Promise<string | undefined>;
};

export const obtainingUserDetails = async (
  profileView: UserProfileView,
  username: string
): Promise<UserDetails> => {
  await profileView.open(username);

  const name = await profileView.readName();
  const bio = await profileView.readBio();

  return { username, name, bio };
};
