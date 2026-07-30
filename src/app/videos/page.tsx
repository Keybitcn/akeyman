import Link from "next/link";
import { VideoList } from "@/components/VideoList";
import { createPageMetadata } from "@/lib/metadata";
import { wangyou } from "@/lib/wangyou";

export const metadata = createPageMetadata({
  title: "影秀",
  description: "在本站播放影秀",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <div className="wy-content-page">
      <div className="wy-box">
        <div className="wy-box-head">{wangyou.modules.video} · 全部影秀</div>
        <div className="wy-box-body">
          <div className="wy-alt">
            共 <span>{wangyou.videos.length}</span> 个节目 · 点击封面或标题在本站播放
          </div>
          <VideoList videos={wangyou.videos} />
          <div className="wy-more">
            <Link href="/">&gt;&gt; 返回地盘首页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}