"use client";

import React, { useMemo, useState } from "react";
import { RolesTableColumns } from "@/app/(dashboard)/system-console/roles/_components/roles-table-columns";
import { useDataTable } from "@/hooks/common/use-data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTable } from "@/components/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { DataTableAdvancedFilterField, DataTableRowAction } from "@/types/data-table";
import { RolesTableToolbarActions } from "@/app/(dashboard)/system-console/roles/_components/roles-table-toolbar-actions";
import { Role } from "@/types/role";
import { RoleDeleteDialog } from "@/app/(dashboard)/system-console/roles/_components/role-delee-dialog";
import { useGetRoles } from "@/hooks/system-console/roles/useRole";

const advancedFilterFields: DataTableAdvancedFilterField<any>[] = [
  {
    id: "email",
    label: "Email",
    type: "text",
  },
  {
    id: "role",
    label: "Vai trò",
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Teacher", value: "teacher" },
      { label: "Student", value: "student" },
      { label: "Moderator", value: "moderator" },
    ],
  },
  {
    id: "status",
    label: "Trạng thái",
    type: "select",
    options: [
      { label: "Hoạt động", value: "active" },
      { label: "Không hoạt động", value: "inactive" },
    ],
  },
  {
    id: "created_at",
    label: "Ngày tạo",
    type: "date",
  },
];

const RolesTable = () => {
  const { data, isLoading } = useGetRoles();

  console.log(data);

  const [rowAction, setRowAction] = useState<DataTableRowAction<Role> | null>(null);

  const columns = useMemo(() => RolesTableColumns({ setRowAction }), []);

  const { table } = useDataTable({
    data: [],
    columns,
    initialState: {
      sorting: [{ id: "name", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, i) => (originalRow.id ?? i).toString(),
  });

  return !isLoading ? (
    <>
      <DataTable table={table}>
        <DataTableAdvancedToolbar
          show={{
            search: true,
            filter: false,
            sort: false,
            viewOptions: true,
          }}
          table={table}
          filterFields={advancedFilterFields}
        >
          <RolesTableToolbarActions />
        </DataTableAdvancedToolbar>
      </DataTable>

      <RoleDeleteDialog
        role={rowAction?.row}
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(null)}
        onConfirm={setRowAction}
      />
    </>
  ) : (
    <DataTableSkeleton
      columnCount={7}
      filterableColumnCount={2}
      cellWidths={["2.5rem", "15rem", "6rem", "6rem", "6rem", "6rem", "2.5rem"]}
      shrinkZero
    />
  );
};

export default RolesTable;
