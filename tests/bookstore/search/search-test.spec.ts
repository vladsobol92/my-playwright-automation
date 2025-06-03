import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { HomePage } from "../../../pages/home-page";

// search test

/**
 * T1
 * 1) navigate to main page
 * 2) type in search soemthing
 * 3) validate results found
 */
test("Search existing book", async ({ page }) => {
  const searchPhrase = "Lord of the rings";
  // go to URL
  await page.goto("/en");
  // Accept cookie
  const homePage = await acceptCookies(page);

  //type in the search input
  const searchListPage = await homePage.pageHeader.performSearch(searchPhrase);

  await searchListPage.expectItemsListPageLoaded();

  const pageTitleText = await searchListPage.getTitleText();

  // wait for full results to load
  expect(pageTitleText, "Expect search results to load").toContain(
    "Search results"
  );

  // check search results are loaded
  expect(
    await searchListPage.getAllItemsCount(),
    "Expect searched items are loaded"
  ).toBeGreaterThan(0);
});

/**
 * T2
 * 1) navigate to main page
 * 2) type non existing values in search
 * 3) validate results NOT found
 */

test("Search non-existing book", async ({ page }) => {
  const searchPhrase = "asdadasdasd";
  // go to URL
  await page.goto("/en");
  // Accept cookie
  const homePage = await acceptCookies(page);

  //type in the search input
  const searchListPage = await homePage.pageHeader.performSearch(searchPhrase);

  await searchListPage.expectItemsListPageLoaded();

  const pageTitleText = await searchListPage.getTitleText();

  // wait for full results to load
  expect(pageTitleText, "Expect search results to load").toContain(
    "Search results"
  );

  expect(
    await searchListPage.getAllItemsCount(),
    "Expect searched items are loaded"
  ).toBe(1);
});
