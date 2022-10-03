import { Tweet } from "./Tweet";

export type UserTweetsView = {
  open: (username: string) => Promise<void>;
  readNextTweet: () => Promise<Tweet | null>;
};
