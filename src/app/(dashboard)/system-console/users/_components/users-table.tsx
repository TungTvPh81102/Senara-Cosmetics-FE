"use client";
import { DataTableAdvancedFilterField, DataTableRowAction } from "@/types/data-table";
import { useMemo, useState } from "react";
import { getColumns } from "@/app/(dashboard)/system-console/users/_components/users-table-columns";
import { useDataTable } from "@/hooks/common/use-data-table";
import { DataTable } from "@/components/data-table";
import { UsersTableFloatingBar } from "@/app/(dashboard)/system-console/users/_components/users-table-floating-bar";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { UsersTableToolbarActions } from "@/app/(dashboard)/system-console/users/_components/users-table-toolbar-actions";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { UsersDeleteDialog } from "@/app/(dashboard)/system-console/users/_components/users-delete-dialog";

const FAKE_USERS_DATA = [
  {
    id: 1,
    username: "admin_user",
    name: "Nguyễn Văn Admin",
    email: "admin@example.com",
    phone: "0987654321",
    created_at: "2024-01-15",
    status: "active",
    role: "admin",
    total_course: 15,
    total_student: 120,
    total_course_active: 12,
  },
  {
    id: 2,
    username: "teacher_john",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "0912345678",
    created_at: "2024-02-20",
    status: "active",
    role: "teacher",
    total_course: 8,
    total_student: 65,
    total_course_active: 7,
  },
  {
    id: 3,
    username: "student_mary",
    name: "Mary Johnson",
    email: "mary.johnson@example.com",
    phone: "0923456789",
    created_at: "2024-03-10",
    status: "inactive",
    role: "student",
    total_course: 0,
    total_student: 0,
    total_course_active: 0,
  },
  {
    id: 4,
    username: "teacher_anna",
    name: "Anna Wilson",
    email: "anna.wilson@example.com",
    phone: "0934567890",
    created_at: "2024-01-25",
    status: "active",
    role: "teacher",
    total_course: 12,
    total_student: 89,
    total_course_active: 10,
  },
  {
    id: 5,
    username: "student_bob",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "0945678901",
    created_at: "2024-04-05",
    status: "active",
    role: "student",
    total_course: 0,
    total_student: 0,
    total_course_active: 0,
  },
  {
    id: 6,
    username: "moderator_lisa",
    name: "Lisa Davis",
    email: "lisa.davis@example.com",
    phone: "0956789012",
    created_at: "2024-02-14",
    status: "active",
    role: "moderator",
    total_course: 5,
    total_student: 30,
    total_course_active: 5,
  },
  {
    id: 7,
    username: "teacher_mike",
    name: "Mike Taylor",
    email: "mike.taylor@example.com",
    phone: "0967890123",
    created_at: "2024-03-20",
    status: "inactive",
    role: "teacher",
    total_course: 3,
    total_student: 25,
    total_course_active: 0,
  },
  {
    id: 8,
    username: "student_sarah",
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    phone: "0978901234",
    created_at: "2024-04-12",
    status: "active",
    role: "student",
    total_course: 0,
    total_student: 0,
    total_course_active: 0,
  },
];

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

const UsersTable = () => {
  const isLoading = false;

  const [rowAction, setRowAction] = useState<DataTableRowAction<any> | null>(null);

  const columns = useMemo(() => getColumns({ setRowAction }), []);

  const { table } = useDataTable({
    data: FAKE_USERS_DATA,
    columns,
    initialState: {
      sorting: [{ id: "created_at", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, i) => (originalRow.id ?? i).toString(),
  });

  return !isLoading ? (
    <>
      <DataTable table={table} floatingBar={<UsersTableFloatingBar table={table} />}>
        <DataTableAdvancedToolbar table={table} filterFields={advancedFilterFields}>
          <UsersTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>

      <UsersDeleteDialog
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(null)}
        currentRow={rowAction?.row.original}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
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

export default UsersTable;
