import type { Table } from "@tanstack/react-table";
import { Download, Mail, Trash2, UserCheck, UserX, X } from "lucide-react";
import * as React from "react";

import { exportTableToXLSX } from "@/lib/export";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Portal } from "@/components/ui/portal";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UsersMultiDeleteDialog } from "@/app/(dashboard)/system-console/users/_components/users-multi-delete-dialog";

interface CoursesTableFloatingBarProps {
  table: Table<any>;
}

export function UsersTableFloatingBar({ table }: CoursesTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  return (
    <>
      <Portal>
        <div className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit px-2.5">
          <div className="w-full overflow-x-auto">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-background p-2 text-foreground shadow">
              <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">
                <span className="whitespace-nowrap text-xs">{rows.length} được chọn</span>
                <Separator orientation="vertical" className="ml-2 mr-1" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-5 hover:border"
                      onClick={() => table.toggleAllRowsSelected(false)}
                    >
                      <X className="!size-3.5 shrink-0" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900">
                    <p className="mr-2">Bỏ chọ</p>
                    <Kbd abbrTitle="Escape" variant="outline">
                      Esc
                    </Kbd>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Separator orientation="vertical" className="hidden h-5 sm:block" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    aria-label="Mời người dùng đã chọn"
                    title="Mời người dùng đã chọn"
                  >
                    <Mail />
                    <span className="sr-only">Mời người dùng đã chọn</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mời người dùng đã chọn</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    // onClick={() => handleBulkStatusChange("active")}
                    className="size-7 border"
                    aria-label="Kích hoạt người dùng đã chọn"
                    title="Kích hoạt người dùng đã chọn"
                  >
                    <UserCheck />
                    <span className="sr-only">Kích hoạt người dùng đã chọn</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Kích hoạt người dùng đã chọn</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    // onClick={() => handleBulkStatusChange("inactive")}
                    className="size-7 border"
                    aria-label="Hủy kích hoạt người dùng đã chọn"
                    title="Hủy kích hoạt người dùng đã chọn"
                  >
                    <UserX />
                    <span className="sr-only">Hủy kích hoạt người dùng đã chọn</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hủy kích hoạt người dùng đã chọn</p>
                </TooltipContent>
              </Tooltip>
              <div className="flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 border"
                      onClick={() =>
                        exportTableToXLSX(table, {
                          filename: "courses",
                          excludeColumns: ["select", "actions"],
                          onlySelected: true,
                        })
                      }
                    >
                      <Download className="!size-3.5" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Xuất</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 border"
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      <Trash2 className="!size-3.5" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Xóa người dùng đã chọn</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </Portal>

      <UsersMultiDeleteDialog
        table={table}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      />
    </>
  );
}
