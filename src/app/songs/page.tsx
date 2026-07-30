import Link from "next/link";
import { SongList } from "@/components/SongList";
import { createPageMetadata } from "@/lib/metadata";
import { wangyou } from "@/lib/wangyou";

export const metadata = createPageMetadata({
  title: "歌秀",
  description: "在本站播放我的歌单",
  path: "/songs",
});

export default function SongsPage() {
  return (
    <div className="wy-content-page">
      <div className="wy-box">
        <div className="wy-box-head">{wangyou.modules.songs} · 完整歌单</div>
        <div className="wy-box-body">
          <div className="wy-alt">
            共 <span>{wangyou.songs.length}</span> 首 · 点击歌名或 ▶
            在本站底部播放器中收听（YouTube 流媒体）
          </div>
          <SongList songs={wangyou.songs} />
        </div>
      </div>

      <div className="wy-box" style={{ marginTop: 10 }}>
        <div className="wy-box-head">{wangyou.modules.radio} · 播客/收藏</div>
        <div className="wy-box-body">
          <div className="wy-alt">
            共 <span>{wangyou.radios.length}</span> 个节目
          </div>
          <SongList songs={wangyou.radios} kind="radio" />
          <div className="wy-more">
            <Link href="/">&gt;&gt; 返回地盘首页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}