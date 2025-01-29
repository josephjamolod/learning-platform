"use client";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/groups";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

type Props = {
  className?: string;
  inputStyle?: string;
  placeholder?: string;
  searchType: "GROUPS" | "POSTS";
  iconStyle?: string;
  glass?: boolean;
};

const Search = ({
  searchType,
  className,
  glass,
  iconStyle,
  inputStyle,
  placeholder,
}: Props) => {
  const { query, onSearchQuery } = useSearch(searchType);
  return (
    <div
      className={cn(
        "border-2 flex gap-2 items-center",
        className,
        glass &&
          "bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-20"
      )}
    >
      <SearchIcon className={cn(iconStyle || "text-secondary")} />
      <Input
        onChange={onSearchQuery}
        value={query}
        className={cn(
          "border-0  focus-visible:ring-0 placeholder:text-secondary focus-visible:border-transparent focus:outline-none",
          inputStyle
        )}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default Search;
