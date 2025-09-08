"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  status: string;
  role: string;
  total_course: number;
  total_student: number;
  total_course_active: number;
};

type UsersDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: User;
  showTrigger?: boolean;
  onSuccess?: () => void;
};

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
  showTrigger = true,
  onSuccess,
}: UsersDeleteDialogProps) {
  const [value, setValue] = useState("");

  const handleDelete = () => {
    if (!currentRow || value.trim() !== currentRow.username) return;

    console.log("Deleting user:", currentRow);

    if (onSuccess) {
      onSuccess();
    }

    setValue("");
    onOpenChange(false);
  };

  if (!currentRow) {
    return null;
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className="text-destructive">
          <AlertTriangle className="stroke-destructive me-1 inline-block" size={18} />
          Xóa người dùng
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Bạn có chắc chắn muốn xóa người dùng{" "}
            <span className="font-bold">{currentRow.name}</span>({currentRow.username})?
            <br />
            Hành động này sẽ xóa vĩnh viễn người dùng với vai trò{" "}
            <span className="font-bold">{currentRow.role.toUpperCase()}</span> khỏi hệ thống. Thao
            tác này không thể hoàn tác.
          </p>

          <div className="space-y-2">
            <Label htmlFor="confirm-username">Nhập tên đăng nhập để xác nhận xóa:</Label>
            <Input
              id="confirm-username"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Nhập "${currentRow.username}" để xác nhận`}
              className="w-full"
            />
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Cảnh báo!</AlertTitle>
            <AlertDescription>Vui lòng cẩn thận, thao tác này không thể hoàn tác.</AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Xóa"
      cancelBtnText="Hủy"
      destructive
    />
  );
}
