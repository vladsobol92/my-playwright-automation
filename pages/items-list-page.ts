import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderPage } from "./page-components/page-header";

export class ItemsListPage {
  private readonly page: Page;
  readonly pageHeader: HeaderPage;

  // locators
  private readonly mainElement: Locator;
  private readonly itemsListTitle: Locator;
  private readonly productItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = new HeaderPage(this.page);
    this.mainElement = this.page.locator('[class^="styles_itemsRow__"]');
    this.itemsListTitle = this.page.locator('[class^="styles_titleRow__"]');
    this.productItem = this.page.locator(
      '[class^="styles_productCardWrapper__"]'
    );
  }

  async expectItemsListPageLoaded() {
    await expect(this.mainElement).toBeVisible();
    return this;
  }

  async getTitleText() {
    return await this.itemsListTitle.textContent();
  }

  async getAllItemsCount() {
    try {
      // try to wait for items and get the count
      await this.productItem.first().waitFor();
      return this.productItem.count();
    } catch (e) {
      // error - no items found
      return 0;
    }
  }
}
