import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { HomePage } from "../../../pages/home-page";

// Before each test, navigate to main page and accept cookies
test.beforeEach("Before each", async ({ page }) => {
  await page.goto("/en");
  await acceptCookies(page);
});

/**
 * Shared helper to perform a search and return the resulting page
 */
const performSearchFlow = async (page, searchPhrase: string) => {
  const homePage = new HomePage(page);
  const searchResultsPage = await homePage.pageHeader.performSearch(
    searchPhrase
  );
  await searchResultsPage.expectItemsListPageLoaded();

  const titleText = await searchResultsPage.getTitleText();
  expect(titleText, "Expect search results to load").toContain(
    "Search results"
  );

  return searchResultsPage;
};

test("Search for an existing book", async ({ page }) => {
  const searchPhrase = "Lord of the rings";
  const searchResultsPage = await performSearchFlow(page, searchPhrase);

  const itemCount = await searchResultsPage.getAllItemsCount();
  expect(itemCount, "Expect searched items are loaded").toBeGreaterThan(0);
});

test("Search for a non-existing book", async ({ page }) => {
  const searchPhrase = "asdadasdasd"; // unlikely to return results
  const searchResultsPage = await performSearchFlow(page, searchPhrase);

  const itemCount = await searchResultsPage.getAllItemsCount();
  expect(itemCount, "Expect no items to be found").toBe(0);
});
