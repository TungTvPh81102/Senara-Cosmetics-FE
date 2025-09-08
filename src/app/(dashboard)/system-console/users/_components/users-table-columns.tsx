"use client";

import type { DataTableRowAction } from "@/types/data-table.ts";
import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";
import { LongText } from "@/components/long-text";
import { formatDate } from "@/lib/common";
import { dateRangeFilterFn } from "@/lib/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash2, UserPen } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

interface GetColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<any> | null>>;
}

export function getColumns({ setRowAction }: GetColumnsProps): ColumnDef<any>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      meta: {
        className: cn("sticky md:table-cell start-0 z-10 rounded-tl-[inherit]"),
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: "username",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
      cell: ({ row }) => <LongText className="max-w-36 ps-3">{row.getValue("username")}</LongText>,
      enableHiding: false,
    },
    {
      id: "fullName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => {
        const { firstName, lastName } = row.original;
        const fullName = `${firstName} ${lastName}`;
        return <LongText className="max-w-36">{fullName}</LongText>;
      },
      meta: { className: "w-36" },
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Phone Number" />,
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const { status } = row.original;
        return <div className="flex space-x-2">{row.getValue("status")}</div>;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: false,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
      cell: ({ row }) => (row.original.created_at ? formatDate(row.original.created_at) : "-"),
      sortingFn: "datetime",
      filterFn: dateRangeFilterFn,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const course = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
                <DotsHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-w-40">
              <DropdownMenuItem>
                Cập nhật
                <DropdownMenuShortcut>
                  <UserPen size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                onSelect={() => setRowAction({ row, type: "delete" })}
              >
                Xóa
                <DropdownMenuShortcut>
                  <Trash2 size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
