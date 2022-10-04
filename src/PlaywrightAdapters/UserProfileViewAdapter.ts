import assert from "assert";
import { BrowserContext, Page } from "playwright";
import { UserProfileView } from "../ObtainingUserDetails";

export class UserProfileViewAdapter implements UserProfileView {
  private browserContext: BrowserContext;
  private page?: Page;

  constructor(browserContext: BrowserContext) {
    this.browserContext = browserContext;
  }

  private async resolvePage(): Promise<Page> {
    if (!this.page) {
      this.page = await this.browserContext.newPage();
    }
    return this.page;
  }

  async open(username: string): Promise<void> {
    const page = await this.resolvePage();

    const url = `https://twitter.com/${username}`;
    await page.goto(url);

    await Promise.all([
      page.waitForLoadState("load"),
      page.waitForLoadState("networkidle"),
    ]);
    await page.waitForTimeout(2000);
  }

  async readName() {
    const page = await this.resolvePage();

    const nameLocator = page
      .locator('[data-testid="primaryColumn"]')
      .locator('h2[role="heading"]');

    const name = await nameLocator.textContent();
    assert.ok(typeof name === "string");

    return name;
  }

  async readBio() {
    const page = await this.resolvePage();

    const bioLocator = page.locator('[data-testid="UserDescription"]');
    const bio = await bioLocator.textContent();
    return bio || undefined;
  }
}
