import { Browser, BrowserContext, chromium, Page } from "playwright";
import { BlankUserProfileView } from "../ObtainingUserDetails";
import { UserProfileViewAdapter } from "./UserProfileViewAdapter";
import { BlankUserProfileViewAdapter } from "./BlankUserProfileViewAdapter";

jest.setTimeout(30000);

describe("BlankUserProfileView with Playwright", () => {
  let testBrowser: Browser;
  let testBrowserContext: BrowserContext;
  let testPage: Page;

  beforeAll(async () => {
    testBrowser = await chromium.launch({ devtools: false });
    testBrowserContext = await testBrowser.newContext();
  });

  afterAll(async () => {
    await testBrowserContext.close();
    await testBrowser.close();
  });

  describe("Ordinar behavior: case of @qeri55916757", () => {
    let blankProfileView: BlankUserProfileView;

    beforeAll(async () => {
      testPage = await testBrowserContext.newPage();
      blankProfileView = new BlankUserProfileViewAdapter(testPage);
    });

    test("open by username", async () => {
      const profileView = await blankProfileView.open("qeri55916757");
      expect(profileView).toBeInstanceOf(UserProfileViewAdapter);
    });
  });
});
