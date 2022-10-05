import { Tweet } from "@/twitter-model/Tweet";
import { UserTweetsView } from "./ports/UserTweetsView";
import { TwitterBrowser } from "./ports/TwitterBrowser";

type Dependencies = {
  tweetsView: UserTweetsView;
  twitterBrowser: TwitterBrowser;
};

export const collectingUserTweets = async (
  { tweetsView }: Dependencies,
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
