import { useState, useCallback } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type PaginationState,
} from "@tanstack/react-table";
import { useDebouncedCallback } from "use-debounce";

export interface ServerTableFilters {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";

  [key: string]: any;
}

interface UseServerDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  totalCount?: number;
  pageCount?: number;
  initialFilters?: ServerTableFilters;
  onFiltersChange?: (filters: ServerTableFilters) => void;
  searchDebounceMs?: number;
  enableRowSelection?: boolean;
  getRowId?: (originalRow: TData, index: number) => string;
}

export function useServerDataTable<TData>({
  data,
  columns,
  totalCount = 0,
  pageCount = 0,
  initialFilters = { page: 1, limit: 10 },
  onFiltersChange,
  searchDebounceMs = 500,
  enableRowSelection = true,
  getRowId,
}: UseServerDataTableOptions<TData>) {
  // Local state for UI
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // Debounced search
  const debouncedSearch = useDebouncedCallback((searchValue: string) => {
    onFiltersChange?.({ ...initialFilters, search: searchValue, page: 1 });
  }, searchDebounceMs);

  // Handle pagination
  const pagination: PaginationState = {
    pageIndex: (initialFilters.page || 1) - 1,
    pageSize: initialFilters.limit || 10,
  };

  const setPagination = useCallback(
    (updater: any) => {
      const currentPagination = {
        pageIndex: (initialFilters.page || 1) - 1,
        pageSize: initialFilters.limit || 10,
      };

      const newPagination = typeof updater === "function" ? updater(currentPagination) : updater;

      onFiltersChange?.({
        ...initialFilters,
        page: newPagination.pageIndex + 1,
        limit: newPagination.pageSize,
      });
    },
    [initialFilters, onFiltersChange],
  );

  // Handle sorting
  const handleSortingChange = useCallback(
    (updater: any) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater;

      setSorting(newSorting);

      if (newSorting.length > 0) {
        const sort = newSorting[0];
        onFiltersChange?.({
          ...initialFilters,
          sort: sort.id,
          order: sort.desc ? "desc" : "asc",
          page: 1,
        });
      } else {
        onFiltersChange?.({
          ...initialFilters,
          sort: undefined,
          order: undefined,
          page: 1,
        });
      }
    },
    [sorting, initialFilters, onFiltersChange],
  );

  // Handle global filter (search)
  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      setGlobalFilter(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  // Handle column filters
  const handleColumnFiltersChange = useCallback(
    (updater: any) => {
      const newFilters = typeof updater === "function" ? updater(columnFilters) : updater;

      setColumnFilters(newFilters);

      // Convert column filters to server filters
      const serverColumnFilters = newFilters.reduce((acc: any, filter: any) => {
        acc[filter.id] = filter.value;
        return acc;
      }, {});

      onFiltersChange?.({ ...initialFilters, ...serverColumnFilters, page: 1 });
    },
    [columnFilters, initialFilters, onFiltersChange],
  );

  const table = useReactTable({
    data,
    columns,
    pageCount,
    rowCount: totalCount,
    getCoreRowModel: getCoreRowModel(),

    // Enable server-side operations
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,

    // State
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },

    // State setters
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onGlobalFilterChange: handleGlobalFilterChange,

    // Row selection
    enableRowSelection,
    getRowId,
  });

  // Utility functions
  const resetFilters = useCallback(() => {
    setGlobalFilter("");
    setColumnFilters([]);
    setSorting([]);
  }, []);

  const getSelectedRowIds = useCallback(() => {
    return table.getFilteredSelectedRowModel().rows.map((row) => row.id);
  }, [table]);

  const getSelectedRows = useCallback(() => {
    return table.getFilteredSelectedRowModel().rows.map((row) => row.original);
  }, [table]);

  const clearSelection = useCallback(() => {
    setRowSelection({});
  }, []);

  const updateServerFilters = useCallback(
    (newFilters: Partial<ServerTableFilters>) => {
      onFiltersChange?.({ ...initialFilters, ...newFilters });
    },
    [initialFilters, onFiltersChange],
  );

  return {
    table,
    updateServerFilters,
    resetFilters,
    getSelectedRowIds,
    getSelectedRows,
    clearSelection,
    pagination: {
      currentPage: initialFilters.page || 1,
      pageSize: initialFilters.limit || 10,
      totalCount,
      pageCount,
      hasNextPage: (initialFilters.page || 1) < pageCount,
      hasPreviousPage: (initialFilters.page || 1) > 1,
    },
  };
}
