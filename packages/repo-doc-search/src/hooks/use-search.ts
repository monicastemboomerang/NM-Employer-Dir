import { useState } from "react";
import { Search } from "../lib/search";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const [db, _setDb] = useState(Search.instance);

  const [searchResults, setSearchResults] = useState<
    ReturnType<Search["search"]>
  >([]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setSearchResults(db.search(query, 0.45));
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults([]);
  };

  return {
    search,
    searchResults,
    handleSearch,
    clearSearch,
  };
};
