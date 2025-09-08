import { Metadata } from "next";

import Container from "@/components/container";
import CreateUser from "@/app/(dashboard)/system-console/users/create/_components/create-user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Quản lý người dùng",
  description: "Tạo tài khoản người dùng mới với quyền hạn phù hợp.",
};

const Page = () => {
  return (
    <Container>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Tạo tài khoản người dùng</h2>
          <p className="text-muted-foreground">
            Tạo tài khoản người dùng mới với quyền hạn phù hợp.
          </p>
        </div>
        <Link href="/system-console/users">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </Link>
      </div>
      <CreateUser />
    </Container>
  );
};

export default Page;
