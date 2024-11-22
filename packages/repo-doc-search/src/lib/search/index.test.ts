import { Search } from ".";

describe("Search", () => {
  test("should test autosuggest", () => {
    const searchDb = Search.instance;

    const query = "los ala";

    const autoSuggest = searchDb.autoSuggest(query);

    expect(autoSuggest[0].suggestion).toBe("los alamos");
  });

  test("should test search", () => {
    const searchDb = Search.instance;

    const query = "los alamos";

    const res = searchDb.search(query, 0.4);
    // const autoSuggest = searchDb.autoSuggest(query);

    expect(res[0].name).toBe("Los Alamos National Laboratories");
  });
});
