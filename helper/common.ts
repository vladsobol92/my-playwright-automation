import { expect, Page } from "@playwright/test";

/**
 * Here will be some common methods that can be used in different places
 */

/**
 * Accept cookies
 * @param page
 */
export async function acceptCookies(page: Page) {
  // Accept cookie
  await page.getByRole("button", { name: "Allow all", exact: true }).click();

  // expect Home Page is loaded
  await expect(
    page.getByRole("heading", { name: "By Category" }),
    "Expect 'Home Page' is loaded"
  ).toBeVisible();
}
