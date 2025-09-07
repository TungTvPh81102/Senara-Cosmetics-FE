"use client";

import React from "react";
import { getCookie } from "@/lib/cookies";
import { SearchProvider } from "@/context/search-provider";
import { LayoutProvider } from "@/providers/layout-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/dashboard/app-sidebar";
import { cn } from "@/lib/utils";
import { Outlet } from "@tanstack/react-router";
import { SkipToMain } from "@/components/skip-to-main";

const Layout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const defaultOpen = getCookie("sidebar_state") !== "false";

  return (
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <AppSidebar />
          <SidebarInset
            className={cn(
              "@container/content",
              "has-[[data-layout=fixed]]:h-svh",
              "peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*4))]",
            )}
          >
            {children ?? <Outlet />}
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  );
};

export default Layout;
