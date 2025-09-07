"use client";

import { ErrorScreen } from "@/components/error-screen";

export default function MaintenancePage() {
  return (
    <ErrorScreen
      code="503"
      title="Đang bảo trì hệ thống"
      description="Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn. Dự kiến hoàn thành trong vài phút nữa."
      primary={{
        href: "/",
        label: "Kiểm tra lại",
      }}
    />
  );
}
