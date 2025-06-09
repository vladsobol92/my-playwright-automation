import { test as testWithFixture, expect } from "../../../fixture/home-page-fixture.ts";

testWithFixture.describe("Login tests with the fixture", () => {
  testWithFixture("Login with non-existing credentials shows large error", async ({ homepage }) => {
    const credentials = {
      email: "nonExistingEmail@mail.com",
      password: "12345789",
    };

    const loginFormPage = await homepage.pageHeader.clickLoginButton();
    await loginFormPage.expectLoginPageLoaded();

    await loginFormPage.loginWithCredentials(credentials);
    await loginFormPage.expectLargeErrorMessageIsLoaded();
  });

  testWithFixture("Login with invalid email shows small validation error", async ({ homepage }) => {
    const credentials = {
      email: "invalidEmail",
      password: "12345789",
    };

    const loginFormPage = await homepage.pageHeader.clickLoginButton();
    await loginFormPage.expectLoginPageLoaded();

    await loginFormPage.loginWithCredentials(credentials);
    await loginFormPage.expectSmallErrorMessageIsLoaded();

    const expectedErrorText = "Please enter a valid email.";
    await expect(loginFormPage.errorMessageSmall).toHaveText(expectedErrorText);
  });

  testWithFixture("Login without password shows small validation error", async ({ homepage }) => {
    const credentials = {
      email: "someemail@gmail.com",
      password: "",
    };

    const loginFormPage = await homepage.pageHeader.clickLoginButton();
    await loginFormPage.expectLoginPageLoaded();

    await loginFormPage.loginWithCredentials(credentials);
    await loginFormPage.expectSmallErrorMessageIsLoaded();

    const expectedErrorText = "Required";
    await expect(loginFormPage.errorMessageSmall).toHaveText(expectedErrorText);
  });
});
