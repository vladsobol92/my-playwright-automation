import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderPage } from "./page-components/page-header";
import { BasePage } from "./base-page";
import { log } from "../utill/logger.ts";

export class HomePage extends BasePage<HomePage> {
  readonly pageHeader: HeaderPage;

  // locators
  private readonly mainElement: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = new HeaderPage(this.page);
    this.mainElement = this.page.getByRole("heading", { name: "By Category" });
  }

  async expectHomePageLoaded() {
    await super.expectPageLoaded(this.mainElement, "Home Page");
    return this;
  }
}
