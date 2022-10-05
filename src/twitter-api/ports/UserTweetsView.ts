type ParsedTweet = {
  author: string;
  url: string;
  time: Date;
  text: string;
};

export type UserTweetsView = {
  readNextTweet: () => Promise<ParsedTweet | null>;
};
