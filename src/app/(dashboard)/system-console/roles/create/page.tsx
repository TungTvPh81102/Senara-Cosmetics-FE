import { Metadata } from "next";

import Container from "@/components/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CreateRole from "@/app/(dashboard)/system-console/roles/create/_components/create-role";

export const metadata: Metadata = {
  title: "Quản lý vai trò",
  description: "Tạo vai trò mới với quyền hạn phù hợp.",
};

const Page = () => {
  return (
    <Container>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Thêm vai trò</h2>
          <p className="text-muted-foreground">Thêm vai trò mới với quyền hạn phù hợp.</p>
        </div>
        <Link href="/system-console/users">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </Link>
      </div>
      <CreateRole />
    </Container>
  );
};

export default Page;
