import { mock, MockProxy } from "jest-mock-extended";
import { BrowserContext, Page } from "playwright";
import { UserProfileView } from "./UserProfileView";

class UserProfileViewWithPlaywright implements UserProfileView {
  private browserContext: BrowserContext;
  private page?: Page;

  constructor(context: BrowserContext) {
    this.browserContext = context;
  }

  async open(username: string): Promise<unknown> {
    const { page } = this;

    if (!page) {
      this.page = await this.browserContext.newPage();
      return this.open(username);
    }

    const url = `https://twitter.com/${username}`;
    await page.goto(url);
    await page.waitForLoadState();
  }

  async readName() {
    return "";
  }

  async readImageUrl() {
    return undefined;
  }

  async readBio() {
    return undefined;
  }
}

describe("UserProfileView with Playwright", () => {
  let testBrowserContext: MockProxy<BrowserContext>;
  let testPage: MockProxy<Page>;

  beforeAll(async () => {
    testBrowserContext = mock<BrowserContext>();
    testPage = mock<Page>();

    testBrowserContext.newPage.mockResolvedValueOnce(testPage);
  });

  test("open Twitter profile by username", async () => {
    const profileView = new UserProfileViewWithPlaywright(testBrowserContext);

    await profileView.open("usr");

    expect(testPage.goto).toBeCalledWith("https://twitter.com/usr");
  });

  test("open a page if none yet", async () => {
    const profileView = new UserProfileViewWithPlaywright(testBrowserContext);

    await profileView.open("usr");

    expect(testBrowserContext.newPage).toBeCalledTimes(1);
  });
});
