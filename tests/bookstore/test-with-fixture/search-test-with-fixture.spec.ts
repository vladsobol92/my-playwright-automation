import {
  test as testWithFixture,
  expect,
} from "../../../fixture/home-page-fixture.ts";

/**
 * T1
 * 1) navigate to main page
 * 2) type in search soemthing
 * 3) validate results found
 */

testWithFixture.describe("Search tests with the fixture", () => {
  testWithFixture("Search existing book", async ({ homepage }) => {
    const searchPhrase = "Lord of the rings";

    //type in the search input
    const searchListPage = await homepage.pageHeader.performSearch(
      searchPhrase
    );

    await searchListPage.expectItemsListPageLoaded();

    const pageTitleText = await searchListPage.getTitleText();

    // wait for full results to load
    expect(pageTitleText, "Expect search results to load").toContain(
      "Search results"
    );

    // check search results are loaded
    expect(
      await searchListPage.getAllItemsCount(),
      "Expect searched items are loaded"
    ).toBeGreaterThan(0);
  });

  /**
   * T2
   * 1) navigate to main page
   * 2) type non existing values in search
   * 3) validate results NOT found
   */

  testWithFixture(
    "Search non-existing book: EXPECTED to FAIL",
    async ({ homepage }) => {
      const searchPhrase = "asdadasdasd";

      //type in the search input
      const searchListPage = await homepage.pageHeader.performSearch(
        searchPhrase
      );

      await searchListPage.expectItemsListPageLoaded();

      const pageTitleText = await searchListPage.getTitleText();

      // wait for full results to load
      expect(pageTitleText, "Expect search results to load").toContain(
        "Search results"
      );

      expect(
        await searchListPage.getAllItemsCount(),
        "Expect searched items are NOT loaded"
      ).toBe(1);
    }
  );

  testWithFixture("Search non-existing book", async ({ homepage }) => {
    const searchPhrase = "asdadasdasd";

    //type in the search input
    const searchListPage = await homepage.pageHeader.performSearch(
      searchPhrase
    );

    await searchListPage.expectItemsListPageLoaded();

    const pageTitleText = await searchListPage.getTitleText();

    // wait for full results to load
    expect(pageTitleText, "Expect search results to load").toContain(
      "Search results"
    );

    expect(
      await searchListPage.getAllItemsCount(),
      "Expect searched items are NOT loaded"
    ).toBe(0);
  });
});
