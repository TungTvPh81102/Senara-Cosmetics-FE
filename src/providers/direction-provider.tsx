"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DirectionProvider as RdxDirProvider } from "@radix-ui/react-direction";
import { getCookie, setCookie, removeCookie } from "@/lib/cookies";

export type Direction = "ltr" | "rtl";

const DEFAULT_DIRECTION = "ltr";
const DIRECTION_COOKIE_NAME = "dir";
const DIRECTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type DirectionContextType = {
  defaultDir: Direction;
  dir: Direction;
  setDir: (dir: Direction) => void;
  resetDir: () => void;
};

const DirectionContext = createContext<DirectionContextType | null>(null);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [dir, setDirState] = useState<Direction>(() => {
    // Server-side rendering safety
    if (typeof window === "undefined") return DEFAULT_DIRECTION;
    return (getCookie(DIRECTION_COOKIE_NAME) as Direction) || DEFAULT_DIRECTION;
  });

  // Hydration fix - đồng bộ với cookie sau khi client mount
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Re-check cookie after client mount
    const cookieDir = getCookie(DIRECTION_COOKIE_NAME) as Direction;
    if (cookieDir && cookieDir !== dir) {
      setDirState(cookieDir);
    }
  }, [dir]);

  useEffect(() => {
    if (isClient && typeof document !== "undefined") {
      const htmlElement = document.documentElement;
      htmlElement.setAttribute("dir", dir);
    }
  }, [dir, isClient]);

  const updateDirection = (newDir: Direction) => {
    setDirState(newDir);
    if (typeof window !== "undefined") {
      setCookie(DIRECTION_COOKIE_NAME, newDir, DIRECTION_COOKIE_MAX_AGE);
    }
  };

  const resetDir = () => {
    setDirState(DEFAULT_DIRECTION);
    if (typeof window !== "undefined") {
      removeCookie(DIRECTION_COOKIE_NAME);
    }
  };

  return (
    <DirectionContext.Provider
      value={{
        defaultDir: DEFAULT_DIRECTION,
        dir,
        setDir: updateDirection,
        resetDir,
      }}
    >
      <RdxDirProvider dir={dir}>{children}</RdxDirProvider>
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
}
