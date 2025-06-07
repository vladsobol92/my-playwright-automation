import { expect, type Locator, type Page } from "@playwright/test";
import { HomePage } from "./home-page";
import { BasePage } from "./base-page";

export class CookiesPage extends BasePage<CookiesPage> {
  // locators
  private readonly mainElement: Locator; // main element is the element by which we identify that page is loaded
  private readonly allowAllButton: Locator; // allow all cookies
  private readonly denyButton: Locator;

  constructor(page: Page) {
    super(page);
    // init locators
    this.mainElement = this.page.locator(
      '[class="CybotCookiebotDialogContentWrapper"]'
    );

    this.allowAllButton = page.getByRole("button", {
      name: "Allow all",
      exact: true,
    });

    this.denyButton = page.getByRole("button", { name: "Deny", exact: true });
  }

  async expectCookiesPageLoaded() {
    await super.expectPageLoaded(this.mainElement, "Cookies Page");
    return this;
  }

  async clickAllowCookiesButton() {
    await this.allowAllButton.click();
    return new HomePage(this.page);
  }

  async clickDenyButton() {
    await this.denyButton.click();
    return new HomePage(this.page);
  }
}
