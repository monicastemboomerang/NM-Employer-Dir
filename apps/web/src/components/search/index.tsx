import { useSearch } from "@repo/doc-search";
import { Command, CommandInput, CommandItem, CommandList } from "@repo/ui";
import { navigate } from "astro:transitions/client";

export function SearchBar() {
  const { search, handleSearch, searchResults } = useSearch();

  return (
    <div className="flex justify-center">
      <Command className="max-w-screen-sm rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput
          //   className="shadow-sm"
          onValueChange={handleSearch}
          placeholder="Type search here..."
          value={search}
        />
        <CommandList>
          {/* <CommandEmpty>No results found</CommandEmpty> */}
          {searchResults.map((item) => {
            return (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  navigate(`/programs/${item.slug}`);
                }}
              >
                {item.name}
              </CommandItem>
            );
          })}
        </CommandList>
      </Command>
    </div>
  );
}
