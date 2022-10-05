import { mock, MockProxy } from "jest-mock-extended";
import delay from "delay";
import { BrowserContext, ElementHandle, Page } from "playwright";
import { TwitterBrowser } from "@/twitter-api/ports/TwitterBrowser";
import { UserProfileViewAdapter } from "./UserProfileViewAdapter";
import { UserTweetsViewAdapter } from "./UserTweetsViewAdapter";
import { TwitterBrowserAdapter } from "./TwitterBrowserAdapter";

/** Helper function to resolve ElementHandle based on given order.
 * Useful for `page.waitForSelector`
 */
const resolveSelectorInOrder =
  (partials: string[]) =>
  async (selector: string): Promise<ElementHandle<HTMLElement>> => {
    const index = partials.findIndex((partial) => selector.includes(partial));
    const order = index === -1 ? partials.length : index;
    await delay(order * 10);
    return null as unknown as ElementHandle<HTMLElement>;
  };

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
      beforeEach(() => {
        page.waitForSelector.mockImplementation(
          resolveSelectorInOrder([
            'data-testid="UserName"',
            'data-testid="emptyState"',
          ])
        );
      });

      test("should open Twitter profile", async () => {
        await twitterBrowser.openUserProfile("shakira");
        expect(page.goto).toHaveBeenCalled();
      });

      test("should return proper view", async () => {
        const view = await twitterBrowser.openUserProfile("shakira");
        expect(view).toBeInstanceOf(UserProfileViewAdapter);
      });

      test("should fail if user not found", async () => {
        page.waitForSelector.mockImplementation(
          resolveSelectorInOrder([
            'data-testid="emptyState"',
            'data-testid="UserName"',
          ])
        );

        const open = () => twitterBrowser.openUserTweets("shakira");
        await expect(open()).rejects.toThrowError(/not found/i);
      });
    });

    describe("openUserTweets", () => {
      beforeEach(() => {
        page.waitForSelector.mockImplementation(
          resolveSelectorInOrder([
            'data-testid="tweet"',
            'data-testid="emptyState"',
          ])
        );
      });

      test("should open Twitter profile", async () => {
        await twitterBrowser.openUserTweets("shakira");
        expect(page.goto).toHaveBeenCalled();
      });

      test("should return proper view", async () => {
        const view = await twitterBrowser.openUserTweets("shakira");
        expect(view).toBeInstanceOf(UserTweetsViewAdapter);
      });

      test("should fail if user not found", async () => {
        page.waitForSelector.mockImplementation(
          resolveSelectorInOrder([
            'data-testid="emptyState"',
            'data-testid="tweet"',
          ])
        );

        const open = () => twitterBrowser.openUserTweets("shakira");
        await expect(open()).rejects.toThrowError(/not found/i);
      });
    });
  });
});
