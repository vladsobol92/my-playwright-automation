import { expect, type Locator, type Page } from "@playwright/test";
import { HomePage } from "./home-page";

export class CookiesPage {
  // Page - treat it like Webdriver in Selenium
  private readonly page: Page;

  // locators
  private readonly mainElement: Locator; // main element is the element by which we identify that page is loaded
  private readonly allowAllButton: Locator; // allow all cookies
  private readonly denyButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // init locators
    this.mainElement = page.locator(
      '[class="CybotCookiebotDialogContentWrapper"]'
    );

    this.allowAllButton = page.getByRole("button", {
      name: "Allow all",
      exact: true,
    });

    this.denyButton = page.getByRole("button", { name: "Deny", exact: true });
  }

  async expectCookiesPageLoaded(): Promise<this>  {
    await expect(this.mainElement).toBeVisible();
    return this;
  }

  async clickAllowCookiesButton(): Promise<HomePage> {
    await this.allowAllButton.click();
    return new HomePage(this.page);
  }

  async clickDenyButton(): Promise<HomePage> {
    await this.denyButton.click();
    return new HomePage(this.page);
  }
}
