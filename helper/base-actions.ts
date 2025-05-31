import { expect, Page } from "@playwright/test";
import { CookiesPage } from "../pages/cookies-page";
import { HomePage } from "../pages/home-page";

/**
 * Here will be some common methods that can be used in different places
 */

/**
 * Accept cookies
 * @param page
 */
export async function acceptCookies(page: Page): Promise<HomePage> {
  let cookiesPage = new CookiesPage(page);
  return await (
    await cookiesPage.clickAllowCookiesButton()
  ).expectHomePageLoaded();
}
