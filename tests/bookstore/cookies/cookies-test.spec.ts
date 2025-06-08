import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { CookiesPage } from "../../../pages/cookies-page";

/**
 * 1) navigate to main page
 * 2) accept cokies
 * 3) Check Home page is loaded
 */

test("Accept cookies", async ({ page }) => {
  // go to URL
  await page.goto("/en");
  const cookiesPage = new CookiesPage(page);
  const homePage = await cookiesPage.clickAllowCookiesButton();
  await homePage.expectHomePageLoaded();
});

test("Deny cookies", async ({ page }) => {
  // go to URL
  await page.goto("/en");
  // Deny cookie
  let cookiesPage = new CookiesPage(page);
  const homePage = await cookiesPage.clickDenyButton();
  await homePage.expectHomePageLoaded();
});
