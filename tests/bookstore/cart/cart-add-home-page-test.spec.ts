import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { HomePage } from "../../../pages/home-page";

test.beforeEach("Before each", async ({ page }) => {
  await page.goto("/en");
  await acceptCookies(page);
});

test("Add item to cart: Weekly Top Books", async ({ page }) => {
  const homePage = new HomePage(page);
  const itemPage = await homePage.clickItemWeeklyTopBooks(1);
  await itemPage.expectItemPageLoaded();
  await itemPage.clickAddtoCartButton();
  await expect(itemPage.cartConfirmationText).toBeVisible();
});

test("Add item to cart: New Books ", async ({ page }) => {
  const homePage = new HomePage(page);
  const itemPage = await homePage.clickItemNewBooks(1);
  await itemPage.expectItemPageLoaded();
  await itemPage.clickAddtoCartButton();
  await expect(itemPage.cartConfirmationText).toBeVisible();
});
