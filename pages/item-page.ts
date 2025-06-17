import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderPage } from "./page-components/page-header";
import { BasePage } from "./base-page";
import { log } from "../util/logger";

/**
 * Page Object Model for the Home Page.
 */
export class ItemPage extends BasePage<ItemPage> {
  readonly pageHeader: HeaderPage;

  // Main element used to verify the page is loaded
  private readonly mainElement: Locator;
  private readonly addToCartButton: Locator;
  public readonly cartConfirmationText: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = new HeaderPage(this.page);
    this.mainElement = page.locator('[class^="styles_priceBox_"]');
    this.addToCartButton = this.mainElement.getByRole("button", {
      name: "Add to cart",
      exact: true,
    });
    this.cartConfirmationText = this.page.getByRole("heading", {
      name: "Item added to the basket",
    });
  }

  /**
   * Expect that the Home Page has loaded successfully.
   */
  async expectItemPageLoaded(): Promise<this> {
    await this.expectPageLoaded(this.mainElement, "Item Page");
    return this;
  }

  async clickAddtoCartButton(): Promise<this> {
    await expect(
      this.addToCartButton,
      "'Add to cart' button is INACTIVE"
    ).toBeEnabled();
    await this.addToCartButton.click();
    return this;
  }
}
