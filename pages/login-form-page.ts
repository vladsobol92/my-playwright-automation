import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base-page";
export class LoginFormPage extends BasePage<LoginFormPage> {
  // private readonly page: Page;

  // locators
  private readonly mainElement: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    // init constructor for superclass
    super(page);
    this.mainElement = this.page.locator(
      '[class^="styles_modalLoginContainer__"]'
    );
    this.emailInput = this.mainElement.locator('input[name="email"]');
    this.passwordInput = this.mainElement.locator('input[name="password"]');
    this.submitButton = this.mainElement.locator('button[type="submit"]');
  }

  async expectLoginPageLoaded(): Promise<this> {
    await expect(
      this.mainElement,
      "Expect 'Login Page' is displayed"
    ).toBeVisible();
    return this;
  }

  async setEmail(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  async setPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickSubmit(): Promise<this> {
    await this.submitButton.click();
    return this;
  }

  async loginWithCredentials(credentials: {
    email: string;
    pass: string;
  }): Promise<this> {
    await this.setEmail(credentials.email);
    await this.setPassword(credentials.pass);
    await this.clickSubmit();
    return this;
  }
}
