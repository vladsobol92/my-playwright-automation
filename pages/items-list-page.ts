import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderPage } from "./page-components/page-header";
import { BasePage } from "./base-page";
import { log } from "../util/logger";

/**
 * Page Object Model for the Items List Page.
 */
export class ItemsListPage extends BasePage<ItemsListPage> {
  readonly pageHeader: HeaderPage;

  // Locators
  private readonly mainElement: Locator;
  private readonly itemsListTitle: Locator;
  private readonly productItem: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = new HeaderPage(this.page);

    this.mainElement = page.locator('[class^="styles_itemsRow__"]');
    this.itemsListTitle = page.locator('[class^="styles_titleRow__"]');
    this.productItem = page.locator('[class^="styles_productCardWrapper__"]');
  }

  /**
   * Verifies that the Items List Page is loaded.
   */
  async expectItemsListPageLoaded(): Promise<this> {
    await this.expectPageLoaded(this.mainElement, "Items List Page");
    return this;
  }

  /**
   * Returns the text content of the items list title.
   */
  async getTitleText(): Promise<string | null> {
    return this.itemsListTitle.textContent();
  }

  /**
   * Returns the number of product items displayed on the page.
   * If no items are found or load fails, returns 0.
   */
  async getAllItemsCount(): Promise<number> {
    try {
      await this.productItem.first().waitFor();
      return this.productItem.count();
    } catch (error) {
      return 0;
    }
  }
}
