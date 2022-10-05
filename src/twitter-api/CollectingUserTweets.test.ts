import { mock, MockProxy } from "jest-mock-extended";

import { Tweet } from "../twitter-model/Tweet";
import { collectingUserTweets } from "./CollectingUserTweets";
import { UserTweetsView } from "./ports/UserTweetsView";

describe("collecting user tweets", () => {
  let testTweetsView: MockProxy<UserTweetsView>;

  beforeEach(() => {
    testTweetsView = mock<UserTweetsView>();
  });

  test("usage", async () => {
    const testTweets: Tweet[] = [
      {
        text: "I'm a self-made man!",
        url: "https://twitter.com/qeri55916757/status/1576252650680565761",
        author: "qeri55916757",
        time: new Date("2022-10-01T16:48:11.000Z"),
      },
      {
        text: "I'm just a savvy entrepreneur!",
        url: "https://twitter.com/qeri55916757/status/1576252553251069957",
        author: "qeri55916757",
        time: new Date("2022-10-01T16:47:48.000Z"),
      },
    ];

    testTweetsView.readNextTweet.mockResolvedValueOnce(testTweets[0]);
    testTweetsView.readNextTweet.mockResolvedValueOnce(testTweets[1]);
    testTweetsView.readNextTweet.mockResolvedValueOnce(null);

    const tweets = await collectingUserTweets(testTweetsView, "qeri55916757");

    expect(tweets).toEqual(testTweets);

    expect(testTweetsView.open).toHaveBeenCalledWith("qeri55916757");
  });
});
