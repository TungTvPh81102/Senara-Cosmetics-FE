"use client";

import type { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportTableToXLSX } from "@/lib/export";
import { UsersPrimaryButtons } from "@/app/(dashboard)/system-console/users/_components/users-primary-buttons";

interface UsersTableToolbarActionsProps {
  table: Table<any>;
}

export function UsersTableToolbarActions({ table }: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <UsersPrimaryButtons />

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToXLSX(table, {
            filename: "courses",
            excludeColumns: ["select", "actions"],
          })
        }
        className="gap-2"
      >
        <Download className="size-4" aria-hidden="true" />
        Xuất file
      </Button>
    </div>
  );
}
