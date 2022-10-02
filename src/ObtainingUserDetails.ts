import { UserProfileView } from "./UserProfileView";

export type UserDetails = {
  name: string;
  username: string;
  imageUrl?: string;
  bio?: string;
};

export const obtainingUserDetails = async (
  profileView: UserProfileView,
  username: string
): Promise<UserDetails> => {
  await profileView.open(username);

  const name = await profileView.readName();
  const imageUrl = await profileView.readImageUrl();
  const bio = await profileView.readBio();

  return { username, name, imageUrl, bio };
};
