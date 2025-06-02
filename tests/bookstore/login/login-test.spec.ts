import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";

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

  let homePage = await acceptCookies(page);

  // click Login button
  let loginFormPage = await homePage.pageHeader.clickLoginButton();

  // expect login form is loaded
  await loginFormPage.expectLoginPageLoaded();

  // try to login
  await (
    await loginFormPage.loginWithCredentials(loginData)
  ).expectErrorMessageIsLoaded();
});
