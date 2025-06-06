import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { HomePage } from "../../../pages/home-page";

// search test

test.beforeEach("Before each", async ({ page }) => {
  // go to URL
  await page.goto("/en");
  // Accept cookie
  await acceptCookies(page);
});

/**
 * T1
 * 1) navigate to main page
 * 2) type in search soemthing
 * 3) validate results found
 */
test("Search existing book", async ({ page }) => {
  const searchPhrase = "Lord of the rings";

  //type in the search input
  const searchListPage = await new HomePage(page).pageHeader.performSearch(
    searchPhrase
  );

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

test("Search non-existing book: EXPECTED to FAIL", async ({ page }) => {
  const searchPhrase = "asdadasdasd";

  //type in the search input
  const searchListPage = await new HomePage(page).pageHeader.performSearch(
    searchPhrase
  );

  await searchListPage.expectItemsListPageLoaded();

  const pageTitleText = await searchListPage.getTitleText();

  // wait for full results to load
  expect(pageTitleText, "Expect search results to load").toContain(
    "Search results"
  );

  expect(
    await searchListPage.getAllItemsCount(),
    "Expect searched items are NOT loaded"
  ).toBe(1);
});

test("Search non-existing book", async ({ page }) => {
  const searchPhrase = "asdadasdasd";

  //type in the search input
  const searchListPage = await new HomePage(page).pageHeader.performSearch(
    searchPhrase
  );

  await searchListPage.expectItemsListPageLoaded();

  const pageTitleText = await searchListPage.getTitleText();

  // wait for full results to load
  expect(pageTitleText, "Expect search results to load").toContain(
    "Search results"
  );

  expect(
    await searchListPage.getAllItemsCount(),
    "Expect searched items are NOT loaded"
  ).toBe(0);
});
