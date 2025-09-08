"use client";

import type { DataTableAdvancedFilterField } from "@/types/data-table.ts";
import type { Table } from "@tanstack/react-table";
import type * as React from "react";

import { DataTableFilterList } from "@/components/data-table/data-table-filter-list";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { cn } from "@/lib/utils";
import { DataTableSearch } from "@/components/data-table/data-table-search";

interface DataTableAdvancedToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type Table<TData>
   */
  table: Table<TData>;

  /**
   * An array of filter field configurations for the data table.
   * @type DataTableAdvancedFilterField<TData>[]
   * @example
   * const filterFields = [
   *   {
   *     id: 'name',
   *     label: 'Name',
   *     type: 'text',
   *     placeholder: 'Filter by name...'
   *   },
   *   {
   *     id: 'status',
   *     label: 'Status',
   *     type: 'select',
   *     options: [
   *       { label: 'Active', value: 'active', count: 10 },
   *       { label: 'Inactive', value: 'inactive', count: 5 }
   *     ]
   *   }
   * ]
   */
  filterFields: DataTableAdvancedFilterField<TData>[];

  /**
   * Debounce time (ms) for filter updates to enhance performance during rapid input.
   * @default 300
   */
  debounceMs?: number;

  /**
   * Search configuration. When provided, only search will be shown (no filter/sort).
   * When not provided, filter and sort will be shown by default.
   */
  search?: {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    debounceMs?: number;
  };

  /**
   * Control which components to show
   * @default { search: true, filter: true, sort: true, viewOptions: true }
   */
  show?: {
    search?: boolean;
    filter?: boolean;
    sort?: boolean;
    viewOptions?: boolean;
  };
}

export function DataTableAdvancedToolbar<TData>({
  table,
  filterFields = [],
  debounceMs = 300,
  search,
  show = {},
  children,
  className,
  ...props
}: DataTableAdvancedToolbarProps<TData>) {
  const {
    search: showSearch = true,
    filter: showFilter = true,
    sort: showSort = true,
    viewOptions: showViewOptions = true,
  } = show;

  return (
    <div
      className={cn("flex w-full items-center justify-between gap-2 overflow-auto p-1", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        {showSearch && (
          <DataTableSearch
            table={table}
            placeholder={search?.placeholder}
            value={search?.value}
            onChange={search?.onChange}
            debounceMs={search?.debounceMs ?? debounceMs}
          />
        )}
        {showFilter && (
          <DataTableFilterList table={table} filterFields={filterFields} debounceMs={debounceMs} />
        )}
        {showSort && <DataTableSortList table={table} debounceMs={debounceMs} />}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {showViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
