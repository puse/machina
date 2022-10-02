import * as assert from "assert";
import { BrowserContext, chromium, Locator, Page } from "playwright";

type Tweet = {
  author: string;
  url: string;
  time: Date;
  text: string;
  images: string[];
};

const parseTweet = async (container: Locator): Promise<Tweet> => {
  const textLocator = container.locator('[data-testid="tweetText"]');
  const [text] = await textLocator.allTextContents();

  const timeLocator = container.locator("time").first();
  const timeString = await timeLocator.getAttribute("datetime");
  assert.ok(typeof timeString === "string", "time is not found on tweet");
  const time = new Date(timeString);

  const tweetLinkLocator = timeLocator.locator("..");
  const url = await tweetLinkLocator.getAttribute("href");
  assert.ok(typeof url === "string");

  const authorLinkLocator = container.locator('a[role="link"]').first();
  const authorLink = await authorLinkLocator.getAttribute("href");
  assert.ok(
    typeof authorLink === "string",
    "author reference is not found on tweet"
  );
  const author = authorLink.substring(1);

  const imagesLocator = container
    .locator("data-testid=tweetPhoto")
    .locator("img");
  const imagesCount = await imagesLocator.count();
  const images: string[] = [];
  for (let i = 0; i < imagesCount; i++) {
    const imageSource = await imagesLocator.nth(i).getAttribute("src");
    if (typeof imageSource === "string") {
      images.push(imageSource);
    }
  }

  return { text, time, author, url, images };
};

type NextTweetFocused = {
  tag: "NextTweetFocused";
  locator: Locator;
};
type NoNextTweetToFocus = {
  tag: "NoNextTweetToFocus";
};
type FocusingResult = NextTweetFocused | NoNextTweetToFocus;

const isNextTweetFocused = (
  result: FocusingResult
): result is NextTweetFocused => {
  return result.tag === "NextTweetFocused";
};

const focusNextTweet = async (page: Page): Promise<FocusingResult> => {
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

  return initialFocusHash !== actualFocusHash
    ? { tag: "NextTweetFocused", locator: focusedLocator }
    : { tag: "NoNextTweetToFocus" };
};

const CollectingTweets = async (username: string) => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
  });
  const context = await browser.newContext({
    baseURL: "https://twitter.com/",
  });

  const page = await context.newPage();

  await page.goto(username);
  await page.waitForLoadState();
  // NOTE: will fail when no tweets available
  await page.waitForSelector('article[data-testid="tweet"]');

  const collectTweetsOneByOne = async (
    previousTweets: Tweet[] = []
  ): Promise<Tweet[]> => {
    const focusingResult = await focusNextTweet(page);

    if (!isNextTweetFocused(focusingResult)) {
      return previousTweets;
    }

    const tweet = await parseTweet(focusingResult.locator);
    return collectTweetsOneByOne([...previousTweets, tweet]);
  };

  const tweets = await collectTweetsOneByOne();

  await context.close();
  await browser.close();

  return tweets;
};

CollectingTweets("qeri55916757").then(console.log);
