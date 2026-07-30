import Link from "next/link";
import { PhotoGallery } from "@/components/PhotoGallery";
import { createPageMetadata } from "@/lib/metadata";
import { wangyou } from "@/lib/wangyou";

export const metadata = createPageMetadata({
  title: "相册",
  description: "浏览相册",
  path: "/photos",
});

export default function PhotosPage() {
  const total = wangyou.albums.reduce((n, a) => n + a.photos.length, 0);

  return (
    <div className="wy-content-page">
      <div className="wy-box">
        <div className="wy-box-head">{wangyou.modules.photo} · 完整相册</div>
        <div className="wy-box-body">
          <div className="wy-alt">
            共 <span>{wangyou.albums.length}</span> 个相册 ·{" "}
            <span>{total}</span> 张照片 · 点击可放大浏览
          </div>
          <PhotoGallery albums={wangyou.albums} />
          <div className="wy-more">
            <Link href="/">&gt;&gt; 返回地盘首页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}