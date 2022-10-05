import { Browser, BrowserContext, chromium } from "playwright";
import { UserTweetsView } from "@/twitter-api/ports/UserTweetsView";
import { Tweet } from "@/twitter-model/Tweet";
import { TwitterBrowser } from "@/twitter-api/ports/TwitterBrowser";
import { TwitterBrowserAdapter } from "@/twitter-adapter-playwright/TwitterBrowserAdapter";

jest.setTimeout(30000);

describe("UserTweetsView with Playwright", () => {
  let browser: Browser;
  let browserContext: BrowserContext;
  let twitterBrowser: TwitterBrowser;

  beforeAll(async () => {
    browser = await chromium.launch({ devtools: false });
    browserContext = await browser.newContext();
    twitterBrowser = new TwitterBrowserAdapter(browserContext);
  });

  afterAll(async () => {
    await browserContext.close();
    await browser.close();
  });

  describe("Ordinar behavior: case of @qeri55916757", () => {
    let tweetsView: UserTweetsView;

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
      tweetsView = await twitterBrowser.openUserTweets("qeri55916757");
    });

    test("read the first tweet", async () => {
      const tweet = await tweetsView.readNextTweet();
      expect(tweet).toEqual(testTweets[0]);
    });

    test("read the last tweet", async () => {
      const tweet = await tweetsView.readNextTweet();
      expect(tweet).toEqual(testTweets[1]);
    });

    test("read one more time after the last tweet", async () => {
      const tweet = await tweetsView.readNextTweet();
      expect(tweet).toBeNull();
    });
  });

  describe("Failures", () => {
    test("User not found", async () => {
      const open = () => twitterBrowser.openUserProfile("qeri112233445566");
      await expect(open()).rejects.toThrowError(/not found/i);
    });
  });
});
