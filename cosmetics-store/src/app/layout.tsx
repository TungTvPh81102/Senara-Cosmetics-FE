import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import ProgressBar from "@/components/nprogress";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeautyStore - Cửa hàng mỹ phẩm chính hãng",
  description: "Cửa hàng mỹ phẩm uy tín với các sản phẩm chính hãng từ những thương hiệu hàng đầu thế giới",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ProgressBar />
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
