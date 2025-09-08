"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { LongText } from "@/components/long-text";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";
import { formatDate } from "@/lib/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Trash2, UserPen, Copy, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Role } from "@/types/role";

interface RolesTableColumnsProps {
  setRowAction?: React.Dispatch<React.SetStateAction<any>>;
}

export function RolesTableColumns({ setRowAction }: RolesTableColumnsProps): ColumnDef<Role>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Chọn tất cả"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Chọn dòng"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      id: "stt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="STT" />,
      cell: ({ row, table }) => {
        const pagination = table.getState().pagination;
        return pagination.pageIndex * pagination.pageSize + row.index + 1;
      },
      enableSorting: false,
      enableHiding: false,
      size: 60,
    },

    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tên vai trò" />,
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <LongText className="max-w-48 font-medium">{row.original.name}</LongText>
        </div>
      ),
      enableSorting: true,
      size: 200,
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mô tả" />,
      cell: ({ row }) => (
        <LongText className="max-w-64 text-muted-foreground">
          {row.original.description || "-"}
        </LongText>
      ),
      enableSorting: false,
      size: 250,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={status ? "default" : "secondary"}
            className={status ? "bg-green-100 text-green-800" : ""}
          >
            {status ? "Hoạt động" : "Không hoạt động"}
          </Badge>
        );
      },
      enableSorting: true,
      size: 120,
    },
    {
      accessorKey: "users_count",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Số người dùng" />,
      cell: ({ row }) => <div className="text-center">{row.original.users_count || 0}</div>,
      enableSorting: true,
      size: 120,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.created_at ? formatDate(row.original.created_at) : "-"}
        </div>
      ),
      enableSorting: true,
      size: 120,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const role = row.original;

        const handleStatusToggle = () => {
          const newStatus = role.status ? "inactive" : "active";
        };

        const handleDuplicate = () => {
          const newName = `${role.name} (Copy)`;
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                <DotsHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>
                Chi tiết
                <DropdownMenuShortcut>
                  <Eye size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem>
                Chỉnh sửa
                <DropdownMenuShortcut>
                  <UserPen size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleDuplicate}>
                Sao chép
                <DropdownMenuShortcut>
                  <Copy size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleStatusToggle}>
                {role.status ? "Vô hiệu hóa" : "Kích hoạt"}
                <DropdownMenuShortcut>
                  {role.status ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                onSelect={() => (setRowAction ? setRowAction({ row, type: "delete" }) : null)}
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
      enableSorting: false,
      enableHiding: false,
      size: 80,
    },
  ];
}
