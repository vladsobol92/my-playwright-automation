import { expect, type Locator, type Page } from "@playwright/test";
import { LoginFormPage } from "../login-form-page";

export class HeaderPage {
  private readonly page: Page;

  // locators
  private readonly mainElement: Locator;

  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainElement = this.page.locator('[class^="styles_header__"]');
    this.loginButton = this.page.getByText("Login");
  }

  async expectHeaderPageLoaded(): Promise<this> {
    await expect(this.mainElement).toBeVisible();
    return this;
  }

  async clickLoginButton(): Promise<LoginFormPage> {
    await this.loginButton.click();
    return new LoginFormPage(this.page);
  }
}
