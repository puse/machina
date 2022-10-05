import { Browser, BrowserContext, chromium } from "playwright";
import { UserProfileView } from "@/twitter-api/ports/UserProfileView";
import { TwitterBrowserAdapter } from "@/twitter-adapter-playwright/TwitterBrowserAdapter";
import { TwitterBrowser } from "@/twitter-api/ports/TwitterBrowser";

jest.setTimeout(30000);

describe("UserProfileView with Playwright", () => {
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
    let profileView: UserProfileView;

    const testData = {
      name: "Qeri",
      username: "qeri55916757",
      bio: "He's the best uncle ever! He's also a philanthropist.",
    };

    beforeAll(async () => {
      profileView = await twitterBrowser.openUserProfile("qeri55916757");
    });

    test("get user display name", async () => {
      const name = await profileView.readName();
      expect(name).toBe(testData.name);
    });

    test("get user bio", async () => {
      const bio = await profileView.readBio();
      expect(bio).toBe(testData.bio);
    });
  });

  describe("Failures", () => {
    test("User not found", async () => {
      const open = () => twitterBrowser.openUserProfile("qeri112233445566");
      await expect(open()).rejects.toThrowError(/not found/i);
    });
  });
});
