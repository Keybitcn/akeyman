import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { wangyou } from "@/lib/wangyou";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return wangyou.videos.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const video = wangyou.videos.find((v) => v.id === id);
  if (!video) return { title: "影秀未找到" };
  return createPageMetadata({
    title: video.title,
    description: `播放：${video.title}`,
    path: `/videos/${id}`,
  });
}

export default async function VideoPlayPage({ params }: PageProps) {
  const { id } = await params;
  const video = wangyou.videos.find((v) => v.id === id);
  if (!video) notFound();

  const idx = wangyou.videos.findIndex((v) => v.id === id);
  const prev = idx > 0 ? wangyou.videos[idx - 1] : null;
  const next = idx >= 0 && idx < wangyou.videos.length - 1 ? wangyou.videos[idx + 1] : null;

  return (
    <div className="wy-content-page">
      <Link href="/videos" className="wy-back">
        ← 返回影秀列表
      </Link>

      <div className="wy-box">
        <div className="wy-box-head">{video.title}</div>
        <div className="wy-box-body">
          <div className="wy-video-player-wrap">
            <video
              className="wy-video-player"
              controls
              playsInline
              preload="metadata"
              poster={video.thumb || "/uploads/archive/blog-pic1.jpg"}
              src={video.src
                .split("/")
                .map((seg, i) => (i === 0 || seg === "" ? seg : encodeURIComponent(seg)))
                .join("/")}
            >
              您的浏览器不支持视频播放
            </video>
          </div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              {prev ? (
                <Link href={`/videos/${prev.id}`}>« {prev.title}</Link>
              ) : (
                <span style={{ color: "#999" }}>已是第一个</span>
              )}
            </div>
            <div>
              {next ? (
                <Link href={`/videos/${next.id}`}>{next.title} »</Link>
              ) : (
                <span style={{ color: "#999" }}>已是最后一个</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}