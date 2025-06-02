import { expect, type Locator, type Page } from "@playwright/test";
import { LoginFormPage } from "../login-form-page";
import { ItemsListPage } from "../items-list-page";
export class HeaderPage {
  private readonly page: Page;

  // locators
  private readonly mainElement: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainElement = this.page.locator('[class^="styles_header__"]');
    this.searchInput = this.mainElement.locator('input[name="search"]');
    this.searchButton = this.mainElement.getByRole("button", {
      name: "Search",
    });
    this.loginButton = this.page.getByText("Login");
  }

  async expectHeaderPageLoaded(): Promise<this> {
    await expect(this.mainElement).toBeVisible();
    return this;
  }

  async clickLoginButton() {
    await this.loginButton.click();
    return new LoginFormPage(this.page);
  }

  async setSearchPhrase(searchPhrase: string): Promise<this> {
    await this.searchInput.nth(1).fill(searchPhrase);
    return this;
  }

  async clickSearchButton() {
    await this.searchButton.click();
    return new ItemsListPage(this.page);
  }

  async performSearch(searchPhrase: string) {
    await this.setSearchPhrase(searchPhrase);
    return await this.clickSearchButton();
  }
}
