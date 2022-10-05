import assert from "assert";
import { Locator, Page } from "playwright";
import { UserTweetsView } from "@/twitter-api/ports/UserTweetsView";

export class UserTweetsViewAdapter implements UserTweetsView {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(username: string): Promise<void> {
    const { page } = this;

    const url = `https://twitter.com/${username}`;
    await page.goto(url);

    await Promise.all([
      page.waitForLoadState("load"),
      page.waitForLoadState("networkidle"),
    ]);
    await page.waitForTimeout(1000);
  }

  private async focusNextTweet() {
    const { page } = this;

    const initialFocusedLocator = page.locator(
      '[data-focusvisible-polyfill="true"]'
    );
    const hasInitialFocus = await initialFocusedLocator
      .count()
      .then((count) => count > 0);
    const initialFocusHash = hasInitialFocus
      ? await initialFocusedLocator.innerHTML()
      : null;

    const nextTweetShortcut = "j";
    await page.keyboard.press(nextTweetShortcut);
    await page.waitForLoadState();

    const focusedLocator = page.locator('[data-focusvisible-polyfill="true"]');
    const hasActualFocus = await focusedLocator
      .count()
      .then((count) => count > 0);
    const actualFocusHash = hasActualFocus
      ? await focusedLocator.innerHTML()
      : null;

    return initialFocusHash !== actualFocusHash ? focusedLocator : null;
  }

  private async parseTweet(wrapper: Locator) {
    const textLocator = wrapper.locator('[data-testid="tweetText"]');
    const [text] = await textLocator.allTextContents();

    const timeLocator = wrapper.locator("time").first();
    const timeString = await timeLocator.getAttribute("datetime");
    assert.ok(typeof timeString === "string", "time is not found on tweet");
    const time = new Date(timeString);

    const tweetLinkLocator = timeLocator.locator("..");
    const url = await tweetLinkLocator.getAttribute("href");
    assert.ok(typeof url === "string");

    const authorLinkLocator = wrapper.locator('a[role="link"]').first();
    const authorLink = await authorLinkLocator.getAttribute("href");
    assert.ok(
      typeof authorLink === "string",
      "author reference is not found on tweet"
    );
    const author = authorLink.substring(1);

    return { text, time, author, url };
  }

  async readNextTweet() {
    const focusedTweetLocator = await this.focusNextTweet();
    return focusedTweetLocator ? this.parseTweet(focusedTweetLocator) : null;
  }
}
