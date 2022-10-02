import assert from "assert";
import { Page } from "playwright";
import { UserProfileView } from "../UserProfileView";

export class UserProfileViewAdapter implements UserProfileView {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(username: string): Promise<void> {
    const { page } = this;

    const url = `https://twitter.com/${username}`;
    await page.goto(url);
    await page.waitForLoadState();
  }

  async readName() {
    const nameLocator = this.page
      .locator('[data-testid="primaryColumn"]')
      .locator('h2[role="heading"]');

    const name = await nameLocator.textContent();
    assert.ok(typeof name === "string");

    return name;
  }

  async readImageUrl() {
    throw new Error("NotImplemented");
    return void 0;
  }

  async readBio() {
    const bioLocator = this.page.locator('[data-testid="UserDescription"]');
    const bio = await bioLocator.textContent();
    return bio || undefined;
  }
}
