import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderPage } from "./page-components/page-header";

export class HomePage {
  private readonly page: Page;
  readonly pageHeader: HeaderPage;

  // locators
  private readonly mainElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = new HeaderPage(this.page);
    this.mainElement = this.page.getByRole("heading", { name: "By Category" });
  }

  async expectHomePageLoaded(): Promise<this>  {
    await expect(this.mainElement).toBeVisible();
    return this;
  }
}
