import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/posts";
import "./globals.css";

export const metadata: Metadata = createPageMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <AppShell posts={posts}>{children}</AppShell>
      </body>
    </html>
  );
}