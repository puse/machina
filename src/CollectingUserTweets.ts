import { Tweet } from "./twitter-model/Tweet";

export type UserTweetsView = {
  open: (username: string) => Promise<void>;
  readNextTweet: () => Promise<Tweet | null>;
};

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
