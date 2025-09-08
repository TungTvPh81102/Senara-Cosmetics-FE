import Container from "@/components/container";
import RolesTable from "@/app/(dashboard)/system-console/roles/_components/roles-table";

export default function Page() {
  return (
    <Container>
      <h2 className="text-2xl font-bold tracking-tight">Quản lý vai trò</h2>
      <p className="text-muted-foreground">Quản lý vai trò và quyền hạn trong hệ thống</p>
      <RolesTable />
    </Container>
  );
}
