import { mock, MockProxy } from "jest-mock-extended";
import { BrowserContext, Page } from "playwright";
import { TwitterBrowser } from "@/twitter-api/ports/TwitterBrowser";
import { UserProfileViewAdapter } from "./UserProfileViewAdapter";
import { UserTweetsViewAdapter } from "./UserTweetsViewAdapter";
import { TwitterBrowserAdapter } from "./TwitterBrowserAdapter";

describe("TwitterBrowser", () => {
  let browserContext: MockProxy<BrowserContext>;

  beforeAll(async () => {
    browserContext = mock<BrowserContext>();
  });

  describe("constructor", () => {
    test("should depend on Playwright browser context", () => {
      const twitterBrowser = new TwitterBrowserAdapter(browserContext);
      expect(twitterBrowser).toBeInstanceOf(TwitterBrowserAdapter);
    });
  });

  describe("public behavior", () => {
    let page: MockProxy<Page>;
    let twitterBrowser: TwitterBrowser;

    beforeEach(() => {
      page = mock<Page>();
      browserContext.newPage.mockResolvedValueOnce(page);

      twitterBrowser = new TwitterBrowserAdapter(browserContext);
    });

    describe("openUserProfile", () => {
      test("should open Twitter profile", async () => {
        await twitterBrowser.openUserProfile("shakira");
        expect(page.goto).toHaveBeenCalledWith("https://twitter.com/shakira");
      });

      test("should return proper view", async () => {
        const view = await twitterBrowser.openUserProfile("shakira");
        expect(view).toBeInstanceOf(UserProfileViewAdapter);
      });
    });

    describe("openUserTweets", () => {
      test("should open Twitter profile", async () => {
        await twitterBrowser.openUserTweets("shakira");
        expect(page.goto).toHaveBeenCalledWith("https://twitter.com/shakira");
      });

      test("should return proper view", async () => {
        const view = await twitterBrowser.openUserTweets("shakira");
        expect(view).toBeInstanceOf(UserTweetsViewAdapter);
      });
    });
  });
});
