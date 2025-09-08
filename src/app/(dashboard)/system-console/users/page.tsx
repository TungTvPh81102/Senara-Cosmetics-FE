import { Metadata } from "next";

import Container from "@/components/container";
import UsersTable from "@/app/(dashboard)/system-console/users/_components/users-table";

export const metadata: Metadata = {
  title: "Quản lý người dùng",
  description: "Quản lý người dùng và vai trò của họ tại đây.",
};

const Page = () => {
  return (
    <Container>
      <h2 className="text-2xl font-bold tracking-tight">Quản lý người dùng</h2>
      <p className="text-muted-foreground">Quản lý người dùng và vai trò của họ tại đây.</p>
      <UsersTable />
    </Container>
  );
};

export default Page;
