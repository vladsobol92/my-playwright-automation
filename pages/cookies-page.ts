import { expect, type Locator, type Page } from "@playwright/test";
import { HomePage } from "./home-page";
import { BasePage } from "./base-page";
import { log } from "../util/logger";

/**
 * Page Object Model for the Cookies Consent Dialog
 */
export class CookiesPage extends BasePage<CookiesPage> {
  // Locators
  private readonly mainElement: Locator;
  private readonly allowAllButton: Locator;
  private readonly denyButton: Locator;

  constructor(page: Page) {
    super(page);

    this.mainElement = page.locator('[class="CybotCookiebotDialogContentWrapper"]');
    this.allowAllButton = page.getByRole("button", { name: "Allow all", exact: true });
    this.denyButton = page.getByRole("button", { name: "Deny", exact: true });
  }

  /**
   * Checks if the cookies dialog is loaded by waiting for the main element.
   */
  async isLoaded(timeout: number): Promise<boolean> {
    return super.isPageLoaded(this.mainElement, timeout);
  }

  /**
   * Expects the cookies dialog to be visible on the page.
   */
  async expectCookiesPageLoaded(): Promise<this> {
    await super.expectPageLoaded(this.mainElement, "Cookies Page");
    return this;
  }

  /**
   * Clicks "Allow all" and returns to the Home Page.
   */
  async clickAllowCookiesButton(): Promise<HomePage> {
    await this.allowAllButton.click();
    return new HomePage(this.page);
  }

  /**
   * Clicks "Deny" and returns to the Home Page.
   */
  async clickDenyButton(): Promise<HomePage> {
    await this.denyButton.click();
    return new HomePage(this.page);
  }
}
