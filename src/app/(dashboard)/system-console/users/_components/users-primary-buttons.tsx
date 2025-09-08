"use client";

import { MailPlus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function UsersPrimaryButtons() {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" className="space-x-1">
        <span>Mời người dùng</span> <MailPlus size={18} />
      </Button>
      <Button size="sm" onClick={() => router.push("/system-console/users/create")}>
        <span>Thêm người dùng</span>
        <UserPlus size={16} />
      </Button>
    </div>
  );
}
