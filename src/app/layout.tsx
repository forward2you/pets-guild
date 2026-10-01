import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PawGuide 新手宠物养护助手",
    template: "%s · PawGuide",
  },
  description: "从选择合适的宠物开始，获得与你的生活和宠物成长阶段匹配的养护指南。",
  keywords: ["新手养宠", "宠物选择", "养狗指南", "养猫指南", "宠物养护"],
};

export const viewport: Viewport = {
  themeColor: "#f8f5ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
