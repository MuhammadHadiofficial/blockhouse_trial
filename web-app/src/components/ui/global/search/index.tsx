import React from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/useSearch";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const Search = ({ placeholder = "Search...", onSearch }: SearchProps) => {
  const { query, onSearchQuery, isFetching } = useSearch();
  
  // Trigger the onSearch callback when query changes
  React.useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="flex flex-col gap-y-2 w-full max-w-md">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          onChange={onSearchQuery}
          value={query}
          className="pl-10 bg-transparent border-2 outline-none"
          placeholder={placeholder}
          type="text"
        />
      </div>
      
      {isFetching && (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      )}
    </div>
  );
};

export default Search;