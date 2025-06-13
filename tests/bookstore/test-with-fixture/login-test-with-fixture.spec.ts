import {
  test as testWithFixture,
  expect,
} from "../../../fixture/home-page-fixture.ts";
import { goToLoginForm } from "../../../helper/base-actions";

testWithFixture.describe("Login tests with the fixture", () => {
  testWithFixture(
    "Login with non-existing credentials",
    async ({ homepage, page }) => {
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
    }
  );

  testWithFixture("Login with invalid email", async ({homepage, page }) => {
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

  testWithFixture("Login without password", async ({ homepage,page }) => {
    const credentials = {
      email: "someemail@gmail.com",
      password: "",
    };
    const loginFormPage = await goToLoginForm(page);

    await loginFormPage.loginWithCredentials(credentials);
    await expect(
      loginFormPage.missingRequiredFiledError,
      "'Missing required field' error message"
    ).toBeVisible();
  });
});
