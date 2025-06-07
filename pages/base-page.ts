import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Base page
 * We will put here some common logic and methods for all pages and then all pages will be extending the base page
 */
export class BasePage<T> {
  // Page - treat it like Webdriver in Selenium
  public readonly page: Page;

  // locators
  public errorMessage_large: Locator;
  public errorMessage_small: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorMessage_large = page.locator('[class*="styles_error"]'); // expect error message
    this.errorMessage_small = page.locator(".errorMessage"); // expect error message
  }

  async expectPageLoaded(mainElement: Locator, pageName: string) {
    await expect(mainElement, `Expect '${pageName}' is loaded`).toBeVisible();
    return this;
  }

  async expectLargeErrorMessageIsLoaded() {
    await expect(
      this.errorMessage_large,
      "Expect Error meessage is displayed"
    ).toBeVisible();
    return this;
  }

  async expectSmallErrorMessageIsLoaded() {
    await expect(
      this.errorMessage_small,
      "Expect Error meessage is displayed"
    ).toBeVisible();
    return this;
  }
}
