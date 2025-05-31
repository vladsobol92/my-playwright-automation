import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { CookiesPage } from "../../../pages/cookies-page";

const TEST_URL = "https://rahvaraamat.ee/en";

/**
 * 1) navigate to main page
 * 2) accept cokies
 * 3) Check Home page is loaded
 */

test("Accept cookies", async ({ page }) => {
  // go to URL
  await page.goto(TEST_URL);
  await acceptCookies(page);
});

test("Deny cookies", async ({ page }) => {
  // go to URL
  await page.goto(TEST_URL);
  // Deny cookie
  let cookiesPage = new CookiesPage(page);
  await (await cookiesPage.clickDenyButton()).expectHomePageLoaded();
});
