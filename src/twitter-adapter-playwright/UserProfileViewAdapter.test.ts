import { Browser, BrowserContext, chromium, Page } from "playwright";
import { UserProfileView } from "../ObtainingUserDetails";
import { UserProfileViewAdapter } from "./UserProfileViewAdapter";

jest.setTimeout(30000);

describe("UserProfileView with Playwright", () => {
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
    let profileView: UserProfileView;

    const testData = {
      name: "Qeri",
      username: "qeri55916757",
      bio: "He's the best uncle ever! He's also a philanthropist.",
    };

    beforeAll(async () => {
      testPage = await testBrowserContext.newPage();
      profileView = new UserProfileViewAdapter(testPage);
    });

    test("open by username", async () => {
      await profileView.open("qeri55916757");
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
});
