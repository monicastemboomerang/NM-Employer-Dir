 
import { Search } from ".";

describe("Search", () => {
  test("should test autosuggest", () => {
    const searchDb = Search.instance;

    const query = "boomer";

    const res = searchDb.search(query);
    const autoSuggest = searchDb.autoSuggest(query);

    console.log("RESULT", res);
    console.log("AUTO SUGGEST", autoSuggest);

    expect(autoSuggest[0].suggestion).toBe("boomerang");
  });
  test("should test search", () => {
    const searchDb = Search.instance;

    const query = "boomera";

    const res = searchDb.search(query, 0.4);
    // const autoSuggest = searchDb.autoSuggest(query);

    console.log("RESULT", res);
    // console.log("AUTO SUGGEST", autoSuggest);

    expect(res[0].name).toBe("Boomerang New Mexico");
  });
});
