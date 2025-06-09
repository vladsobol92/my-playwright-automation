import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderPage } from "./page-components/page-header";
import { BasePage } from "./base-page";
import { log } from "../util/logger";

/**
 * Page Object Model for the Home Page.
 */
export class HomePage extends BasePage<HomePage> {
  readonly pageHeader: HeaderPage;

  // Main element used to verify the page is loaded
  private readonly mainElement: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = new HeaderPage(this.page);
    this.mainElement = page.getByRole("heading", { name: "By Category" });
  }

  /**
   * Asserts that the Home Page has loaded successfully.
   */
  async expectHomePageLoaded(): Promise<this> {
    await this.expectPageLoaded(this.mainElement, "Home Page");
    return this;
  }
}
