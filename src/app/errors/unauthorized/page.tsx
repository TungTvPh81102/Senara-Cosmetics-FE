"use client";

import { ErrorScreen } from "@/components/error-screen";

export default function UnauthorizedPage() {
  return (
    <ErrorScreen
      code="401"
      title="Vui lòng đăng nhập"
      description="Bạn cần đăng nhập để truy cập nội dung này. Nếu bạn đã có tài khoản, vui lòng đăng nhập để tiếp tục."
      primary={{
        href: "/login",
        label: "Đăng nhập ngay",
      }}
      secondary={{
        href: "/",
        label: "Về trang chủ",
        variant: "secondary",
      }}
    />
  );
}
