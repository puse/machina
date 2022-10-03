import { Page } from "playwright";
import { BlankUserProfileView, UserProfileView } from "../ObtainingUserDetails";
import { UserProfileViewAdapter } from "./UserProfileViewAdapter";

export class BlankUserProfileViewAdapter implements BlankUserProfileView {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(username: string): Promise<UserProfileView> {
    const { page } = this;

    const url = `https://twitter.com/${username}`;
    await page.goto(url);

    await Promise.all([
      page.waitForLoadState("load"),
      page.waitForLoadState("networkidle"),
    ]);
    await page.waitForTimeout(2000);

    return new UserProfileViewAdapter(page);
  }
}
