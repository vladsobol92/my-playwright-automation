import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderPage } from "./page-components/page-header";
import { BasePage } from "./base-page";
import { log } from "../util/logger";
import { ItemPage } from "./item-page";

/**
 * Page Object Model for the Home Page.
 */
export class HomePage extends BasePage<HomePage> {
  readonly pageHeader: HeaderPage;

  // Main element used to verify the page is loaded
  private readonly mainElement: Locator;
  private readonly weeklyTopBooksList: Locator;
  private readonly newBooksList: Locator;
  private readonly productItemWeekly: Locator;
  private readonly productItemNew: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = new HeaderPage(this.page);
    this.mainElement = page.getByRole("heading", { name: "By Category" });
    this.weeklyTopBooksList = page
      .locator('[class*="productCarouselContainer"]')
      .nth(0); // 0 - weekly top
    this.productItemWeekly = this.weeklyTopBooksList.locator(
      '[class^="styles_productCard"]'
    );
    this.newBooksList = page.locator('[class*="productCarouselContainer"]').nth(1); // 1 - New books
    this.productItemNew = this.newBooksList.locator(
      '[class^="styles_productCard"]'
    );
  }

  /**
   * Expect that the Home Page has loaded successfully.
   */
  async expectHomePageLoaded(): Promise<this> {
    await this.expectPageLoaded(this.mainElement, "Home Page");
    return this;
  }

  async clickItemWeeklyTopBooks(index: number): Promise<ItemPage> {
    const element = this.productItemWeekly.nth(index);
    await element.scrollIntoViewIfNeeded();
    await element.click();
    return new ItemPage(this.page);
  }

  async clickItemNewBooks(index: number): Promise<ItemPage> {
    const element = this.productItemNew.nth(index);
    await this.page.mouse.wheel(0, 1000); // Scroll down
    await element.click();
    return new ItemPage(this.page);
  }
}
