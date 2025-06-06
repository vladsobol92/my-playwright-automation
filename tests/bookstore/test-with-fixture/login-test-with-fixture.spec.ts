import {
  test as testWithFixture,
  expect,
} from "../../../fixture/home-page-fixture.ts";
import { HomePage } from "../../../pages/home-page.ts";

testWithFixture.describe("Login tests with the fixture", () => {
  testWithFixture(
    "Login with non-existing credentials",
    async ({ homepage }) => {
      // credentials
      let loginData = {
        email: "nonExistingEmail@mail.com",
        pass: "12345789",
      };

      homepage;
      // click Login button
      let loginFormPage = await homepage.pageHeader.clickLoginButton();

      // expect login form is loaded
      await loginFormPage.expectLoginPageLoaded();

      // try to login
      await (
        await loginFormPage.loginWithCredentials(loginData)
      ).expectLargeErrorMessageIsLoaded();
    }
  );

  testWithFixture("Login with invalid email", async ({ homepage }) => {
    // credentials
    let loginData = {
      email: "invalidEmail",
      pass: "12345789",
    };

    // click Login button
    let loginFormPage = await homepage.pageHeader.clickLoginButton();

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

  testWithFixture("Login without password", async ({ homepage }) => {
    // credentials
    let loginData = {
      email: "someemail@gmail.com",
      pass: "",
    };

    // click Login button
    let loginFormPage = await homepage.pageHeader.clickLoginButton();

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
});
