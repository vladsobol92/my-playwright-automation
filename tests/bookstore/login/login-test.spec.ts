import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { HomePage } from "../../../pages/home-page";
import { LoginFormPage } from "../../../pages/login-form-page";

test.beforeEach("Before each", async ({ page }) => {
  await page.goto("/en");
  await acceptCookies(page);
});

/**
 * Helper to go to the login form
 */
const goToLoginForm = async (page): Promise<LoginFormPage> => {
  const homePage = new HomePage(page);
  const loginFormPage = await homePage.pageHeader.clickLoginButton();
  return loginFormPage.expectLoginPageLoaded();
};

test("Login with non-existing credentials", async ({ page }) => {
  const credentials = {
    email: "nonExistingEmail@mail.com",
    password: "12345789",
  };

  const loginFormPage = await goToLoginForm(page);
  await loginFormPage.loginWithCredentials(credentials);
  await loginFormPage.expectLargeErrorMessageIsLoaded();
});

test("Login with invalid email", async ({ page }) => {
  const credentials = {
    email: "invalidEmail",
    password: "12345789",
  };

  const loginFormPage = await goToLoginForm(page);
  await loginFormPage.loginWithCredentials(credentials);
  await loginFormPage.expectSmallErrorMessageIsLoaded();

  const expectedError = "Please enter a valid email.";
  await expect(loginFormPage.errorMessageSmall).toHaveText(expectedError);
});

test("Login without password", async ({ page }) => {
  const credentials = {
    email: "someemail@gmail.com",
    password: "",
  };

  const loginFormPage = await goToLoginForm(page);
  await loginFormPage.loginWithCredentials(credentials);
  await loginFormPage.expectSmallErrorMessageIsLoaded();

  const expectedError = "Required";
  await expect(loginFormPage.errorMessageSmall).toHaveText(expectedError);
});
