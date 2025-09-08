"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Role } from "@/types/role";

interface RoleDeleteDialogProps {
  role: Role | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (role: Role) => void;
  isLoading?: boolean;
}

export const RoleDeleteDialog: React.FC<RoleDeleteDialogProps> = ({
  role,
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}) => {
  if (!role) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa vai trò</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa vai trò <strong>"{role.name}"</strong>?
            {role.users_count && role.users_count > 0 && (
              <span className="text-destructive block mt-2">
                ⚠️ Vai trò này đang được sử dụng bởi {role.users_count} người dùng.
              </span>
            )}
            <br />
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(role)}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
