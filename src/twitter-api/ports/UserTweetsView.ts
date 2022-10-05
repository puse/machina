type ParsedTweet = {
  author: string;
  url: string;
  time: Date;
  text: string;
};

export type UserTweetsView = {
  open: (username: string) => Promise<void>;
  readNextTweet: () => Promise<ParsedTweet | null>;
};
