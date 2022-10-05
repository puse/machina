import { BrowserContext } from "playwright";
import { TwitterBrowser } from "@/twitter-api/ports/TwitterBrowser";
import { UserProfileViewAdapter } from "./UserProfileViewAdapter.js";
import { UserTweetsViewAdapter } from "./UserTweetsViewAdapter.js";

export class TwitterBrowserAdapter implements TwitterBrowser {
  private context: BrowserContext;

  constructor(context: BrowserContext) {
    this.context = context;
  }

  async openUserTweets(username: string) {
    const page = await this.context.newPage();
    return UserTweetsViewAdapter.open({ page }, username);
  }

  async openUserProfile(username: string) {
    const page = await this.context.newPage();
    return UserProfileViewAdapter.open({ page }, username);
  }
}
