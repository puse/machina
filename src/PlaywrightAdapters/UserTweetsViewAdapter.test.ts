import { Browser, BrowserContext, chromium, Page } from "playwright";
import { Tweet, UserTweetsView } from "../CollectingUserTweets";
import { UserTweetsViewAdapter } from "./UserTweetsViewAdapter";

jest.setTimeout(30000);

describe("UserTweetsView with Playwright", () => {
  let testBrowser: Browser;
  let testBrowserContext: BrowserContext;

  beforeAll(async () => {
    testBrowser = await chromium.launch({ devtools: false });
    testBrowserContext = await testBrowser.newContext();
  });

  afterAll(async () => {
    await testBrowserContext.close();
    await testBrowser.close();
  });

  describe("Ordinar behavior: case of @qeri55916757", () => {
    let testView: UserTweetsView;

    const testTweets: Tweet[] = [
      {
        text: "I'm a self-made man!",
        url: "/qeri55916757/status/1576252650680565761",
        author: "qeri55916757",
        time: new Date("2022-10-01T16:48:11.000Z"),
      },
      {
        text: "I'm just a savvy entrepreneur!",
        url: "/qeri55916757/status/1576252553251069957",
        author: "qeri55916757",
        time: new Date("2022-10-01T16:47:48.000Z"),
      },
    ];

    beforeAll(async () => {
      testView = new UserTweetsViewAdapter(testBrowserContext);
    });

    test("open by username", async () => {
      await testView.open("qeri55916757");
    });

    test("read the first tweet", async () => {
      const tweet = await testView.readNextTweet();
      expect(tweet).toEqual(testTweets[0]);
    });

    test("read the last tweet", async () => {
      const tweet = await testView.readNextTweet();
      expect(tweet).toEqual(testTweets[1]);
    });

    test("read one more time after the last tweet", async () => {
      const tweet = await testView.readNextTweet();
      expect(tweet).toBeNull();
    });
  });
});
