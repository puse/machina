import { Tweet } from "@/twitter-model/Tweet";
import { TwitterBrowser } from "./ports/TwitterBrowser";

type Dependencies = {
  twitterBrowser: TwitterBrowser;
};

export const collectingUserTweets = async (
  { twitterBrowser }: Dependencies,
  username: string
): Promise<Tweet[]> => {
  const tweetsView = await twitterBrowser.openUserTweets(username);

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
