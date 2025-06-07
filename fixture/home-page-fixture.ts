import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { acceptCookies } from "../helper/base-actions";
import { log } from "../utill/logger.ts";

type HomePageFixture = {
  homepage: HomePage;
};

export const test = baseTest.extend<HomePageFixture>({
  homepage: async ({ page }, use) => {
    // go to URL
    await page.goto("/en");
    // Accept cookie
    const homepage = await acceptCookies(page);
    await use(homepage);
  },
});

export { expect } from "@playwright/test";
