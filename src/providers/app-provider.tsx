"use client";

import { useEffect, useState } from "react";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DirectionProvider } from "@/providers/direction-provider";

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div id="wrapper">
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DirectionProvider>{children}</DirectionProvider>
        </ThemeProvider>
      </QueryProvider>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default AppProvider;
