import { BrowserContext } from "playwright";
import { TwitterBrowser } from "@/twitter-api/ports/TwitterBrowser";
import { UserProfileViewAdapter } from "./UserProfileViewAdapter";
import { UserTweetsViewAdapter } from "./UserTweetsViewAdapter";

export class TwitterBrowserAdapter implements TwitterBrowser {
  private context: BrowserContext;

  constructor(context: BrowserContext) {
    this.context = context;
  }

  async openUserTweets(username: string) {
    const page = await this.context.newPage();
    const view = new UserTweetsViewAdapter(page);
    await view.open(username);
    return view;
  }

  async openUserProfile(username: string) {
    const page = await this.context.newPage();
    const view = new UserProfileViewAdapter(page);
    await view.open(username);
    return view;
  }
}
