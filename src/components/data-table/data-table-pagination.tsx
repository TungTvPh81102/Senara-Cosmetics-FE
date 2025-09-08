"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const currentPage =
    table?.getState()?.pagination?.pageIndex !== undefined
      ? table.getState().pagination.pageIndex + 1
      : 1;
  const totalPages = table?.getPageCount() ?? 1;

  const getPaginationItems = () => {
    if (!table) return [{ type: "page", page: 1, active: true }];

    const items = [];

    const siblingsCount = 1;

    const leftSiblingIndex = Math.max(2, currentPage - siblingsCount);
    const rightSiblingIndex = Math.min(totalPages - 1, currentPage + siblingsCount);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    items.push({
      type: "page",
      page: 1,
      active: currentPage === 1,
    });

    if (showLeftEllipsis) {
      items.push({ type: "ellipsis", key: "left" });
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push({
          type: "page",
          page: i,
          active: currentPage === i,
        });
      }
    }

    if (showRightEllipsis) {
      items.push({ type: "ellipsis", key: "right" });
    }

    if (totalPages > 1) {
      items.push({
        type: "page",
        page: totalPages,
        active: currentPage === totalPages,
      });
    }

    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <Pagination>
      <PaginationContent className="flex items-center">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            aria-disabled={!table?.getCanPreviousPage()}
            disabled={!table?.getCanPreviousPage()}
          />
        </PaginationItem>

        {paginationItems.map((item) => (
          <PaginationItem key={item.type === "page" ? `page-${item.page}` : `ellipsis-${item.key}`}>
            {item.type === "page" ? (
              <PaginationLink
                isActive={item.active}
                onClick={() => {
                  if (table && item.page !== undefined) table.setPageIndex(item.page - 1);
                }}
              >
                {item.page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => table.nextPage()}
            aria-disabled={!table?.getCanNextPage()}
            disabled={!table?.getCanNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
