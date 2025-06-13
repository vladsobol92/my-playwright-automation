import { test, expect } from "@playwright/test";
import { acceptCookies } from "../../../helper/base-actions";
import { goToLoginForm } from "../../../helper/base-actions";

test.beforeEach("Before each", async ({ page }) => {
  await page.goto("/en");
  await acceptCookies(page);
});

test("Login with non-existing credentials", async ({ page }) => {
  const credentials = {
    email: "nonExistingEmail@mail.com",
    password: "12345789",
  };

  const loginFormPage = await goToLoginForm(page);
  await loginFormPage.loginWithCredentials(credentials);
  await expect(
    loginFormPage.invalidCredentialsError,
    "'Invalid Credentials' error message"
  ).toBeVisible();
});

test("Login with invalid email", async ({ page }) => {
  const credentials = {
    email: "invalidEmail",
    password: "12345789",
  };

  const loginFormPage = await goToLoginForm(page);
  await loginFormPage.loginWithCredentials(credentials);
  await expect(
    loginFormPage.invalidEmailError,
    "'Invalid Email' error message"
  ).toBeVisible();
});

test("Login without password", async ({ page }) => {
  const credentials = {
    email: "someemail@gmail.com",
    password: "",
  };

  const loginFormPage = await goToLoginForm(page);
  await loginFormPage.loginWithCredentials(credentials);
  await expect(
    loginFormPage.missingRequiredFiledError,
    "Missing required field message"
  ).toBeVisible();
});

test("Login without email", async ({ page }) => {
  const credentials = {
    email: "",
    password: "123123123",
  };

  const loginFormPage = await goToLoginForm(page);
  await loginFormPage.loginWithCredentials(credentials);
  await expect(
    loginFormPage.missingRequiredFiledError,
    "Missing required field message"
  ).toBeVisible();
});
