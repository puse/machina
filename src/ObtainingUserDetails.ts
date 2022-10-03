import { UserProfileView } from "./UserProfileView";

export type UserDetails = {
  name: string;
  username: string;
  bio?: string;
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
