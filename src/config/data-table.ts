import { Pickaxe, SquareSquare } from "lucide-react";

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  featureFlags: [
    {
      label: "Bảng nâng cao",
      value: "advancedTable" as const,
      icon: Pickaxe,
      tooltipTitle: "Bật/tắt bảng nâng cao",
      tooltipDescription: "Trình tạo bộ lọc và sắp xếp để lọc và sắp xếp các hàng.",
    },
    {
      label: "Thanh nổi",
      value: "floatingBar" as const,
      icon: SquareSquare,
      tooltipTitle: "Bật/tắt thanh nổi",
      tooltipDescription: "Một thanh nổi cố định ở đầu bảng.",
    },
  ],
  sortOrders: [
    { label: "Tăng dần", value: "asc" as const },
    { label: "Giảm dần", value: "desc" as const },
  ],
  filterFields: [],
  debounceMs: 300,
  columnTypes: ["text", "number", "date", "boolean", "select", "multi-select"] as const,
  globalOperators: [
    "iLike",
    "notILike",
    "eq",
    "ne",
    "isEmpty",
    "isNotEmpty",
    "lt",
    "lte",
    "gt",
    "gte",
    "isBetween",
    "isRelativeToToday",
    "and",
    "or",
  ] as const,
};
