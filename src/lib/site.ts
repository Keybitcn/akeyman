import siteData from "../../content/site.json";

export const siteConfig = {
  ...siteData,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  locale: "zh_CN",
  accent: {
    primary: "#3B82F6",
    secondary: "#60A5FA",
  },
  nav: [
    { label: "首页", href: "/" },
    { label: "歌秀", href: "/songs" },
    { label: "相册", href: "/photos" },
    { label: "影秀", href: "/videos" },
    { label: "日记", href: "/blog" },
    { label: "关于", href: "/about" },
  ],
} as const;