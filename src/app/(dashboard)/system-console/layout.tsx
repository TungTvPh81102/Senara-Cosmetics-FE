"use client";

import React from "react";
import { getCookie } from "@/lib/cookies";
import { SearchProvider } from "@/context/search-provider";
import { LayoutProvider } from "@/providers/layout-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/dashboard/app-sidebar";
import { Header } from "@/components/layouts/dashboard/header";
import { Main } from "@/components/layouts/dashboard/main";
import { cn } from "@/lib/utils";
import { Outlet } from "@tanstack/react-router";
import { SkipToMain } from "@/components/skip-to-main";
import { TopNav } from "@/components/layouts/dashboard/top-nav";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { ProfileDropdown } from "@/components/profile-dropdown";

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
              "flex flex-col h-svh",
              "peer-data-[variant=inset]:h-[calc(100svh-(var(--spacing)*4))]",
            )}
          >
            <Header fixed={true}>
              <TopNav links={topNav} />
              <div className="ms-auto flex items-center space-x-4">
                <Search />
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
              </div>
            </Header>
            <Main className="pt-0">{children ?? <Outlet />}</Main>
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  );
};

export default Layout;
const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];
