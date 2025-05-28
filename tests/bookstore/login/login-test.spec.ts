import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/common";

const TEST_URL = "https://rahvaraamat.ee/en";

test("Login with Invalid credentials", async ({ page }) => {
  // credentials
  let loginData = {
    email: "invalidEmail@mail.com",
    pass: "12345789",
  };

  // go to URL
  await page.goto(TEST_URL);
  // Accept cookie
    // Accept cookie
  await acceptCookies(page);  

  // click Login button
  await page.getByText("Login").click();

  // expect login form is loaded
  const loginWindow = page.locator('[class^="styles_modalLoginContainer__"]');
  await expect(loginWindow, "Expect 'Login window' is displayed").toBeVisible();

  // set email
  await loginWindow.locator('input[name="email"]').fill(loginData.email);

  // set pass
  await loginWindow.locator('input[name="password"]').fill(loginData.pass);

  // click submit
  await loginWindow.locator('button[type="submit"]').click();

  // expect error message
  const errorMsg = page.locator('[class*="styles_error"]');
  await expect(errorMsg, "Expect Error meessage is displayed").toBeVisible();
});
