import { Tweet } from "./Tweet";
import { UserTweetsView } from "./UserTweetsView";

export const collectingUserTweets = async (
  tweetsView: UserTweetsView,
  username: string
): Promise<Tweet[]> => {
  await tweetsView.open(username);

  const collectEachTweet = async (
    previousTweets: Tweet[] = []
  ): Promise<Tweet[]> => {
    const nextTweet = await tweetsView.readNextTweet();
    return nextTweet
      ? collectEachTweet([...previousTweets, nextTweet])
      : previousTweets;
  };

  return collectEachTweet();
};
