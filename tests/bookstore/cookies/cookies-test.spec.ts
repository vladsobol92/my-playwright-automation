import { test, expect } from "@playwright/test";

const TEST_URL = "https://rahvaraamat.ee/en";

/**
 * 1) navigate to main page
 * 2) accept cokies
 * 3) Check Home page is loaded
 */

test("Accept cookies", async ({ page }) => {
  // go to URL
  await page.goto(TEST_URL);
  // Accept cookie
  await page.getByRole("button", { name: "Allow all", exact: true }).click();

  // expect Home Page is loaded
  expect(
    page.getByRole("heading", { name: "By Category" }),
    "Expect 'Home Page' is loaded"
  ).toBeVisible();
});

test("Deny cookies", async ({ page }) => {
  // go to URL
  await page.goto(TEST_URL);
  // Accept cookie
  await page.getByRole("button", { name: "Deny", exact: true }).click();

  // expect Home Page is loaded
  expect(
    page.getByRole("heading", { name: "By Category" }),
    "Expect 'Home Page' is loaded"
  ).toBeVisible();
});
