import { UserDetails } from "../twitter-model/UserDetails";
import { UserProfileView } from "./ports/UserProfileView";

export const obtainingUserDetails = async (
  profileView: UserProfileView,
  username: string
): Promise<UserDetails> => {
  await profileView.open(username);

  const name = await profileView.readName();
  const bio = await profileView.readBio();

  return { username, name, bio };
};
