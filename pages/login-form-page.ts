import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { log } from "../util/logger";

/**
 * Page Object Model for the Login Form modal/page.
 */
export class LoginFormPage extends BasePage<LoginFormPage> {
  // Locators
  private readonly mainElement: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.mainElement = page.locator('[class^="styles_modalLoginContainer__"]');
    this.emailInput = this.mainElement.locator('input[name="email"]');
    this.passwordInput = this.mainElement.locator('input[name="password"]');
    this.submitButton = this.mainElement.locator('button[type="submit"]');
  }

  /**
   * Verifies that the Login Form is visible and loaded.
   */
  async expectLoginPageLoaded(): Promise<this> {
    await this.expectPageLoaded(this.mainElement, "Login Page");
    return this;
  }

  /**
   * Fills in the email field.
   */
  async setEmail(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  /**
   * Fills in the password field.
   */
  async setPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  /**
   * Clicks the submit/login button.
   */
  async clickSubmit(): Promise<this> {
    await this.submitButton.click();
    return this;
  }

  /**
   * Logs in using provided credentials.
   */
  async loginWithCredentials(credentials: { email: string; password: string }): Promise<this> {
    log(`Attempting login with email: ${credentials.email}`);
    await this.setEmail(credentials.email);
    await this.setPassword(credentials.password);
    await this.clickSubmit();
    return this;
  }
}
