import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { acceptCookies } from "../helper/base-actions";
import { log } from "../util/logger.ts";

type HomePageFixture = {
  homepage: HomePage;
};

export const test = baseTest.extend<HomePageFixture>({
  homepage: async ({ page }, use, testInfo) => {
    // log(`Starting test: ${testInfo.title}`);
    // go to URL
    await page.goto("/en");
    // Accept cookie
    const homepage = await acceptCookies(page);

    await use(homepage);
  },
});

// Optionally add beforeEach too
test.afterEach(async ({ page }, testInfo) => {
  // After test: teardown / logging
  //  the code after  await use(homepage) - will be running after the test.
  //console.log(`Test "${testInfo.title}", status: '${testInfo.status}'`);
});

export { expect } from "@playwright/test";
