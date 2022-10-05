import { UserTweetsView } from "./twitter-api/ports/UserTweetsView";
import { Tweet } from "./twitter-model/Tweet";

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
