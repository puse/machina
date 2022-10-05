import { UserDetails } from "@/twitter-model/UserDetails";
import { TwitterBrowser } from "./ports/TwitterBrowser";

type Dependencies = {
  twitterBrowser: TwitterBrowser;
};

export const obtainingUserDetails = async (
  { twitterBrowser }: Dependencies,
  username: string
): Promise<UserDetails> => {
  const profileView = await twitterBrowser.openUserProfile(username);

  const name = await profileView.readName();
  const bio = await profileView.readBio();

  return { username, name, bio };
};
