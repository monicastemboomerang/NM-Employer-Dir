import type { Employer } from "@repo/program-data";
import { Programs } from "@repo/program-data";
import type { SearchResult } from "minisearch";
import MiniSearch from "minisearch";

type SearchType = Employer & {
  //   id: string;
};

export type ProgramSearchResult = SearchResult &
  Pick<Employer, "name" | "slug" | "categories">;

export class Search {
  miniSearch: MiniSearch<SearchType>;
  static #instance: Search;
  private constructor(programs: Employer[]) {
    const miniSearch = new MiniSearch<SearchType>({
      fields: ["name", "overview", "ages", "curriculumTypes", "location", "by"],
      storeFields: ["name", "slug", "ages", "by"],
      searchOptions: {
        boost: {
          name: 2,
          //   overview: 2,
        },
        // fuzzy: 0.2,
      },
    });

    miniSearch.addAll(programs);

    this.miniSearch = miniSearch;
  }

  search(query: string, fuzzy = 0.2): ProgramSearchResult[] {
    return this.miniSearch.search(query, {
      fuzzy,
    }) as ProgramSearchResult[];
  }

  autoSuggest(query: string) {
    return this.miniSearch.autoSuggest(query, {
      fields: ["name", "ages", "curriculumTypes", "location", "by"],
    });
  }

  public static get instance() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Needed for singleton
    if (!this.#instance) {
      const p = Programs.instance;
      const programs: Employer[] = p.programs.map((prog) => ({
        ...prog,
        id: prog.slug,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed
      })) as any;
      this.#instance = new Search(programs);
    }
    return this.#instance;
  }
}
