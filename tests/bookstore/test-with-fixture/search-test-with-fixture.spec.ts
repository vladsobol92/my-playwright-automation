import {
  test as testWithFixture,
  expect,
} from "../../../fixture/home-page-fixture.ts";

testWithFixture.describe("Search tests with the fixture", () => {
  testWithFixture(
    "Search for existing book shows results",
    async ({ homepage }) => {
      const searchPhrase = "Lord of the rings";

      const searchListPage = await homepage.pageHeader.performSearch(
        searchPhrase
      );
      await searchListPage.expectItemsListPageLoaded();

      const pageTitleText = await searchListPage.getTitleText();
      await expect(pageTitleText, "Expect search results to load").toContain(
        "Search results"
      );

      const itemsCount = await searchListPage.getAllItemsCount();
      expect(itemsCount, "Expect searched items are loaded").toBeGreaterThan(0);
    }
  );

  testWithFixture(
    "Search for non-existing book returns no results",
    async ({ homepage }) => {
      const searchPhrase = "asdadasdasd";

      const searchListPage = await homepage.pageHeader.performSearch(
        searchPhrase
      );
      await searchListPage.expectItemsListPageLoaded();

      const pageTitleText = await searchListPage.getTitleText();
      await expect(pageTitleText, "Expect search results to load").toContain(
        "Search results"
      );

      const itemsCount = await searchListPage.getAllItemsCount();
      expect(itemsCount, "Expect searched items are NOT loaded").toBe(0);
    }
  );

  // Optional: Remove or mark as skipped/failing if known broken test
  testWithFixture(
    "Search non-existing book: EXPECTED to FAIL",
    async ({ homepage }) => {
      const searchPhrase = "asdadasdasd";

      const searchListPage = await homepage.pageHeader.performSearch(
        searchPhrase
      );
      await searchListPage.expectItemsListPageLoaded();

      const pageTitleText = await searchListPage.getTitleText();
      await expect(pageTitleText, "Expect search results to load").toContain(
        "Search results"
      );

      const itemsCount = await searchListPage.getAllItemsCount();
      expect(itemsCount, "Expect searched items are NOT loaded").toBe(1);
    }
  );
});
