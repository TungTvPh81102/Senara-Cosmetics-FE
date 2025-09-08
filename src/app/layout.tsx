import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import AppProvider from "@/providers/app-provider";

const manrope = localFont({
  src: "../../public/fonts/Manrope-VariableFont_wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://senara.vn"),
  title: {
    default: "Senara Cosmetics - Mỹ phẩm cao cấp",
    template: "%s | Senara Cosmetics",
  },
  description:
    "Khám phá Senara Cosmetics - hệ thống quản lý mỹ phẩm cao cấp, giúp bạn trải nghiệm sản phẩm chất lượng và tiện lợi.",
  applicationName: "Senara Cosmetics",
  keywords: [
    "Senara",
    "Senara Cosmetics",
    "Mỹ phẩm",
    "Skincare",
    "Trang quản lý mỹ phẩm",
    "Admin Dashboard",
  ],
  authors: [{ name: "Senara Team" }],
  creator: "Senara",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://senara.vn/",
    siteName: "Senara Cosmetics",
    title: "Senara Cosmetics - Mỹ phẩm cao cấp",
    description:
      "Khám phá Senara Cosmetics - hệ thống quản lý mỹ phẩm cao cấp, trải nghiệm sản phẩm chất lượng và tiện lợi.",
    images: [
      {
        url: "https://senara.vn/og-image.png",
        width: 1200,
        height: 630,
        alt: "Senara Cosmetics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senara Cosmetics - Mỹ phẩm cao cấp",
    description:
      "Khám phá Senara Cosmetics - hệ thống quản lý mỹ phẩm cao cấp, trải nghiệm sản phẩm chất lượng và tiện lợi.",
    images: ["https://senara.vn/og-image.png"],
    site: "@SenaraCosmetics",
    creator: "@SenaraTeam",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning className={`${manrope.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
