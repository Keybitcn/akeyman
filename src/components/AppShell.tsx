"use client";

import { WangyouShell } from "@/components/WangyouShell";
import type { PostMeta } from "@/lib/types";

interface AppShellProps {
  children: React.ReactNode;
  posts: PostMeta[];
}

export function AppShell({ children }: AppShellProps) {
  return <WangyouShell>{children}</WangyouShell>;
}