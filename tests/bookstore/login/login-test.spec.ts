import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";

test("Login with non existing credentials", async ({ page }) => {
  // credentials
  let loginData = {
    email: "nonExistingEmail@mail.com",
    pass: "12345789",
  };

  // go to URL
  await page.goto("/en");
  // Accept cookie

  let homePage = await acceptCookies(page);

  // click Login button
  let loginFormPage = await homePage.pageHeader.clickLoginButton();

  // expect login form is loaded
  await loginFormPage.expectLoginPageLoaded();

  // try to login
  await (
    await loginFormPage.loginWithCredentials(loginData)
  ).expectLargeErrorMessageIsLoaded();
});

test("Login with Invalid email", async ({ page }) => {
  // credentials
  let loginData = {
    email: "invalidEmail",
    pass: "12345789",
  };

  // go to URL
  await page.goto("/en");
  // Accept cookie

  let homePage = await acceptCookies(page);

  // click Login button
  let loginFormPage = await homePage.pageHeader.clickLoginButton();

  // expect login form is loaded
  await loginFormPage.expectLoginPageLoaded();

  // try to login
  await (
    await loginFormPage.loginWithCredentials(loginData)
  ).expectSmallErrorMessageIsLoaded();

  // validate error text
  let errorText = "Please enter a valid email.";
  expect(loginFormPage.errorMessage_small).toHaveText(errorText);
});
