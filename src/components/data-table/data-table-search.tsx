"use client";

import type { Table } from "@tanstack/react-table";
import { Search, X } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableSearchProps<TData> {
  /**
   * The table instance returned from useDataTable hook
   */
  table?: Table<TData>;

  /**
   * Search placeholder text
   */
  placeholder?: string;

  /**
   * Controlled search value
   */
  value?: string;

  /**
   * Search change handler
   */
  onChange?: (value: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Debounce time in milliseconds for search input
   * @default 300
   */
  debounceMs?: number;
}

export function DataTableSearch<TData>({
  table,
  placeholder = "Tìm kiếm...",
  value: controlledValue,
  onChange: controlledOnChange,
  className,
  debounceMs = 300,
}: DataTableSearchProps<TData>) {
  const [searchValue, setSearchValue] = React.useState(controlledValue || "");

  const debouncedSetGlobalFilter = React.useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          table?.setGlobalFilter(value);
        }, debounceMs);
      };
    })(),
    [table, debounceMs],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    if (controlledOnChange) {
      controlledOnChange(newValue);
    }

    if (table) {
      debouncedSetGlobalFilter(newValue);
    }
  };

  const handleClear = () => {
    setSearchValue("");

    if (controlledOnChange) {
      controlledOnChange("");
    }

    if (table) {
      table.setGlobalFilter("");
    }
  };

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setSearchValue(controlledValue);
    }
  }, [controlledValue]);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        className="h-8 w-64 pl-9 pr-9"
      />
      {searchValue && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-transparent"
          onClick={handleClear}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
