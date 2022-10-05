import { UserProfileView } from "./twitter-api/ports/UserProfileView";
import { UserDetails } from "./twitter-model/UserDetails";

export const obtainingUserDetails = async (
  profileView: UserProfileView,
  username: string
): Promise<UserDetails> => {
  await profileView.open(username);

  const name = await profileView.readName();
  const bio = await profileView.readBio();

  return { username, name, bio };
};
