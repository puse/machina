import assert from "assert";
import { Page } from "playwright";
import { UserProfileView } from "@/twitter-api/ports/UserProfileView";

type ViewContext = {
  page: Page;
};

export class UserProfileViewAdapter implements UserProfileView {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async readName() {
    const nameLocator = this.page
      .locator('[data-testid="primaryColumn"]')
      .locator('h2[role="heading"]');

    const name = await nameLocator.textContent();
    assert.ok(typeof name === "string");

    return name;
  }

  async readBio() {
    const bioLocator = this.page.locator('[data-testid="UserDescription"]');
    const bio = await bioLocator.textContent();
    return bio || undefined;
  }

  static async open({ page }: ViewContext, username: string) {
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
