import { expect, type Locator, type Page } from "@playwright/test";
import { LoginFormPage } from "../login-form-page";
import { ItemsListPage } from "../items-list-page";
import { BasePage } from "../base-page";

export class HeaderPage extends BasePage<HeaderPage> {
  // Locators
  private readonly mainElement: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.mainElement = page.locator('[class^="styles_header__"]');
    this.searchInput = this.mainElement.locator('input[name="search"]');
    this.searchButton = this.mainElement.getByRole("button", {
      name: "Search",
    });
    this.loginButton = page.getByText("Login");
  }

  // Expectations
  async expectHeaderPageLoaded(): Promise<this> {
    await super.expectPageLoaded(this.mainElement, "Page Header");
    return this;
  }

  // Actions
  async clickLoginButton(): Promise<LoginFormPage> {
    await this.loginButton.click();
    return new LoginFormPage(this.page);
  }

  async setSearchPhrase(phrase: string): Promise<this> {
    await this.searchInput.first().fill(phrase);
    return this;
  }

  async clickSearchButton(): Promise<ItemsListPage> {
    await this.searchButton.click();
    return new ItemsListPage(this.page);
  }

  async performSearch(phrase: string): Promise<ItemsListPage> {
    return this.setSearchPhrase(phrase).then(() => this.clickSearchButton());
  }
}
