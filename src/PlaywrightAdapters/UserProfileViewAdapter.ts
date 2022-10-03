import assert from "assert";
import { Page } from "playwright";
import { UserProfileView } from "../ObtainingUserDetails";

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
}
