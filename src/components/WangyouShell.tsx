"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { MediaPlayerProvider } from "@/components/MediaPlayerContext";
import { wangyou } from "@/lib/wangyou";
import { siteConfig } from "@/lib/site";

export function WangyouShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <MediaPlayerProvider>
    <div className="wy-root">
      <div className="wy-topbar">
        <div className="wy-topbar-inner">
          <div className="wy-brand">
            WangYou.com <em>地盘 Beta · 重置版</em>
          </div>
          <div className="wy-top-actions">
            <span>http://quna.fun</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  navigator.clipboard.writeText("https://quna.fun");
                  alert("地址已复制，可以发给你的好友了");
                }
              }}
            >
              复制
            </a>
            <a href="/">收藏</a>
            <a href="/about">设为首页</a>
          </div>
        </div>
      </div>

      <div className="wy-subnav">
        <div className="wy-subnav-inner">
          {wangyou.nav.map((item) => {
            const base = item.href.split("#")[0] || "/";
            const active =
              base === "/"
                ? pathname === "/"
                : Boolean(pathname?.startsWith(base));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={active ? "active" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="wy-status">
        <span className="slogan">{wangyou.slogan}</span>
        <span style={{ margin: "0 8px", color: "#999" }}>|</span>
        您当前的位置：
        <Link href="/">我的地盘</Link>
        {pathname && pathname !== "/" ? (
          <>
            {" "}
            &gt;{" "}
            {pathname.startsWith("/blog")
              ? "日记"
              : pathname.startsWith("/about")
                ? "关于"
                : pathname.startsWith("/tags")
                  ? "标签"
                  : "页面"}
          </>
        ) : null}
        <span style={{ float: "right", color: "#666" }}>
          主人：{siteConfig.author}
        </span>
      </div>

      {children}

      <div className="wy-footer">
        <div>
          本站为 2007 网友天下个人地盘真实可互动重置版（本地 MP3 / 影秀独立页播放 · 相册可浏览）
        </div>
        <div>
          原址：{wangyou.domain} · 用户：{wangyou.username} · 现域名：quna.fun
        </div>
        <div style={{ color: "#999" }}>
          Powered by 网友天下回忆录 · Key Blog Reset
        </div>
      </div>
      <FloatingPlayer />
    </div>
    </MediaPlayerProvider>
  );
}