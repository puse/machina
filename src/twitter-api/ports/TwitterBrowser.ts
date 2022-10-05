import { UserProfileView } from "./UserProfileView";
import { UserTweetsView } from "./UserTweetsView";

export type TwitterBrowser = {
  openUserProfile: (username: string) => Promise<UserProfileView>;
  openUserTweets: (username: string) => Promise<UserTweetsView>;
};
