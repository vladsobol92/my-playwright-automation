import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { HomePage } from "../../../pages/home-page";

test.beforeEach("Before each", async ({ page }) => {
  // go to URL
  await page.goto("/en");
  // Accept cookie
  await acceptCookies(page);
});

test("Login with non-existing credentials", async ({ page }) => {
  // credentials
  let loginData = {
    email: "nonExistingEmail@mail.com",
    pass: "12345789",
  };

  // click Login button
  let loginFormPage = await new HomePage(page).pageHeader.clickLoginButton();

  // expect login form is loaded
  await loginFormPage.expectLoginPageLoaded();

  // try to login
  await (
    await loginFormPage.loginWithCredentials(loginData)
  ).expectLargeErrorMessageIsLoaded();
});

test("Login with invalid email", async ({ page }) => {
  // credentials
  let loginData = {
    email: "invalidEmail",
    pass: "12345789",
  };

  // click Login button
  let loginFormPage = await new HomePage(page).pageHeader.clickLoginButton();

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

test("Login without password", async ({ page }) => {
  // credentials
  let loginData = {
    email: "someemail@gmail.com",
    pass: "",
  };

  // click Login button
  let loginFormPage = await new HomePage(page).pageHeader.clickLoginButton();

  // expect login form is loaded
  await loginFormPage.expectLoginPageLoaded();

  // try to login
  await (
    await loginFormPage.loginWithCredentials(loginData)
  ).expectSmallErrorMessageIsLoaded();

  // validate error text
  let errorText = "Required";
  expect(loginFormPage.errorMessage_small).toHaveText(errorText);
});
