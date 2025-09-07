"use client";

import { ErrorScreen } from "@/components/error-screen";

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      title="Không tìm thấy trang"
      description={
        "Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng."
      }
      primary={{ href: "/", label: "Về trang chủ" }}
    />
  );
}
