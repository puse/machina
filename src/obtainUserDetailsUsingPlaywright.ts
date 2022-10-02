import { chromium } from "playwright";

async function obtainUserDetails(username: string) {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to https://twitter.com/qeri55916757
  await page.goto("https://twitter.com/qeri55916757");

  // Click [data-testid="UserName"] >> text=Qeri >> nth=0
  await page.locator('[data-testid="UserName"] >> text=Qeri').first().click();

  // Click [data-testid="UserName"] >> text=@qeri55916757
  await page.locator('[data-testid="UserName"] >> text=@qeri55916757').click();

  // Click text=He's the best uncle ever! He's always up for a good time. He's also a philanthro
  await page
    .locator(
      "text=He's the best uncle ever! He's always up for a good time. He's also a philanthro"
    )
    .click();

  // Click text=github.com/despan/machina
  const [page1] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator("text=github.com/despan/machina").click(),
  ]);

  // Click text=Joined September 2022
  await page.locator("text=Joined September 2022").click();

  // Click text=FollowClick to Follow qeri55916757Qeri@qeri55916757He's the best uncle ever! He' >> [data-testid="UserAvatar-Container-qeri55916757"] a[role="link"]
  await page
    .locator(
      'text=FollowClick to Follow qeri55916757Qeri@qeri55916757He\'s the best uncle ever! He\' >> [data-testid="UserAvatar-Container-qeri55916757"] a[role="link"]'
    )
    .click();

  // Click [aria-label="Close"]
  await page.locator('[aria-label="Close"]').click();

  // Click div:nth-child(4) > .css-1dbjc4n >> nth=0
  await page.locator("div:nth-child(4) > .css-1dbjc4n").first().click();

  // Click img[alt="Image"]
  await page.locator('img[alt="Image"]').click();
}

obtainUserDetails("qeri55916757").then(console.log);
