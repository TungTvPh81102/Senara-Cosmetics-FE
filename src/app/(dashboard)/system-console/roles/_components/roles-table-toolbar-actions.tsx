"use client";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RolesTableToolbarActions() {
  return (
    <Link href="/system-console/roles/create">
      <Button size="sm">
        <span>Thêm vai trò</span>
        <ShieldCheck size={16} />
      </Button>
    </Link>
  );
}
