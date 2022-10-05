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

  static async ensureProfile({ page }: ViewContext) {
    const resolve = () => Promise.resolve();

    const rejectWithNotFound = async () => {
      const notFound = new Error("Not found");
      return Promise.reject(notFound);
    };

    return Promise.race([
      page.waitForSelector('[data-testid="UserName"]').then(resolve),
      page
        .waitForSelector('[data-testid="emptyState"]')
        .then(rejectWithNotFound),
    ]);
  }

  static async open({ page }: ViewContext, username: string) {
    const url = `https://twitter.com/${username}`;
    await page.goto(url, { waitUntil: "networkidle" });

    await this.ensureProfile({ page });

    return new UserProfileViewAdapter(page);
  }
}
