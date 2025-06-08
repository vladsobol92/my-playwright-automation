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
  const cookiesPage = new CookiesPage(page);

  const isCookiesPageLoaded = await cookiesPage.isLoaded(1500);
  if (isCookiesPageLoaded) {
    const homePage = await cookiesPage.clickAllowCookiesButton();
    return homePage.expectHomePageLoaded();
  }

  const homePage = new HomePage(page);
  return homePage.expectHomePageLoaded();
}
