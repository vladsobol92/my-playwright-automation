import {
  test as testWithFixture,
  expect,
} from "../../../fixture/home-page-fixture.ts";

testWithFixture.describe("Login tests with the fixture", () => {
  testWithFixture(
    "Login with non-existing credentials",
    async ({ homepage }) => {
      const credentials = {
        email: "nonExistingEmail@mail.com",
        password: "12345789",
      };

      const loginFormPage = await homepage.pageHeader.clickLoginButton();
      await loginFormPage.expectLoginPageLoaded();

      await loginFormPage.loginWithCredentials(credentials);
      await expect(
        loginFormPage.invalidCredentialsError,
        "'Invalid Credentials' error message"
      ).toBeVisible();
    }
  );

  testWithFixture("Login with invalid email", async ({ homepage }) => {
    const credentials = {
      email: "invalidEmail",
      password: "12345789",
    };

    const loginFormPage = await homepage.pageHeader.clickLoginButton();
    await loginFormPage.expectLoginPageLoaded();

    await loginFormPage.loginWithCredentials(credentials);
    await expect(
      loginFormPage.invalidEmailError,
      "'Invalid Email' error message"
    ).toBeVisible();
  });

  testWithFixture("Login without password", async ({ homepage }) => {
    const credentials = {
      email: "someemail@gmail.com",
      password: "",
    };

    const loginFormPage = await homepage.pageHeader.clickLoginButton();
    await loginFormPage.expectLoginPageLoaded();

    await loginFormPage.loginWithCredentials(credentials);
    await expect(
      loginFormPage.missingRequiredFiledError,
      "'Missing required field' error message"
    ).toBeVisible();
  });
});
