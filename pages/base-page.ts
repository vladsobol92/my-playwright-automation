import { expect, type Locator, type Page } from "@playwright/test";

/**
 * BasePage<T>
 * A generic base page class that contains shared logic and locators
 * used across all page object models.
 */
export class BasePage<T> {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;

  }

  /**
   * Waits for an element to be visible within a specified timeout.
   * Returns true if visible, false otherwise.
   */
  async isPageLoaded(element: Locator, timeout: number): Promise<boolean> {
    try {
      await element.waitFor({ timeout });
      return await element.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Expects the main element of a page to be visible.
   */
  async expectPageLoaded(
    mainElement: Locator,
    pageName: string
  ): Promise<this> {
    await expect(
      mainElement,
      `Expect '${pageName}' page to be loaded`
    ).toBeVisible();
    return this;
  }

}
