import { z } from "zod";
import { dataTableConfig } from "@/config/data-table";

export const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
});

export const filterSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  type: z.enum(dataTableConfig.columnTypes),
  operator: z.enum(dataTableConfig.globalOperators),
  rowId: z.string(),
});
