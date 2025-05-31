import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Base page
 * We will put here some common logic and methods for all pages and then all pages will be extending the base page
 */
export class BasePage<T> {
  // Page - treat it like Webdriver in Selenium
  protected readonly page: Page;

  // locators
  protected errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorMessage = page.locator('[class*="styles_error"]'); // expect error message
  }

  async expectErrorMessageIsLoaded(): Promise<this> {
    await expect(
      this.errorMessage,
      "Expect Error meessage is displayed"
    ).toBeVisible();
    return this;
  }
}
