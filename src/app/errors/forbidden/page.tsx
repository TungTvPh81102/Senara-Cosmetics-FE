"use client";

import { ErrorScreen } from "@/components/error-screen";

export default function ForbiddenPage() {
  return (
    <ErrorScreen
      code="403"
      title="Truy cập bị từ chối"
      description="Bạn không có quyền truy cập vào trang này. Vui lòng kiểm tra lại quyền của bạn hoặc liên hệ quản trị viên để được hỗ trợ."
      primary={{
        href: "/",
        label: "Về trang chủ",
      }}
    />
  );
}
