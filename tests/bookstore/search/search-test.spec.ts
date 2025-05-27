import { test, expect } from "@playwright/test";

const TEST_URL = "https://rahvaraamat.ee/en";

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
  await page.goto(TEST_URL);
  // Accept cookie
  await page.getByRole("button", { name: "Allow all", exact: true }).click();

  // expect Home Page is loaded
  expect(
    page.getByRole("heading", { name: "By Category" }),
    "Expect 'Home Page' is loaded"
  ).toBeVisible();

  //type in the search input
  await page.locator('input[name="search"]').nth(1).fill(searchPhrase);

  // submit
  await page.getByRole("button", { name: "Search" }).click();

  // wait for full results to load
  await expect(
    page.getByRole("heading", {
      name: /^Search results: .+$/i,
    })
  ).toBeVisible();

  // check results are visible
  const productCard = page.locator('[class^="styles_productCardWrapper__"]');
  await expect(
    productCard.nth(0),
    "Expect searched items are loaded"
  ).toBeVisible();
});

/**
 * T2
 * 1) navigate to main page
 * 2) type non existing values in search
 * 3) validate results NOT found
 */

test("Search non-existing book", async ({ page }) => {
  const searchPhrase = "Lord of the rings";
  // go to URL
  await page.goto(TEST_URL);
  // Accept cookie
  await page.getByRole("button", { name: "Allow all", exact: true }).click();

  // expect Home Page is loaded
  expect(
    page.getByRole("heading", { name: "By Category" }),
    "Expect 'Home Page' is loaded"
  ).toBeVisible();

  //type in the search input
  await page.locator('input[name="search"]').nth(1).fill(searchPhrase);

  // submit
  await page.getByRole("button", { name: "Search" }).click();

  // wait for full results to load
  await expect(
    page.getByRole("heading", {
      name: /^Search results: .+$/i,
    })
  ).toBeVisible();

  // check results are visible
  const productCard = page.locator('[class^="styles_productCardWrapper__"]');
  expect(await productCard.count(), "Expect no results found").toBe(0);
});
