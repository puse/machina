import { UserDetails } from "@/twitter-model/UserDetails";
import { TwitterBrowser } from "./ports/TwitterBrowser";
import { UserProfileView } from "./ports/UserProfileView";

type Dependencies = {
  profileView: UserProfileView;
  twitterBrowser: TwitterBrowser;
};

export const obtainingUserDetails = async (
  { profileView }: Dependencies,
  username: string
): Promise<UserDetails> => {
  await profileView.open(username);

  const name = await profileView.readName();
  const bio = await profileView.readBio();

  return { username, name, bio };
};
