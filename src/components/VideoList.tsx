"use client";

import Link from "next/link";

type Video = {
  id: string;
  title: string;
  thumb?: string;
  src: string;
};

export function VideoList({
  videos,
  limit,
  moreHref,
}: {
  videos: Video[];
  limit?: number;
  moreHref?: string;
}) {
  const list = limit ? videos.slice(0, limit) : videos;

  return (
    <>
      {list.map((v) => (
        <div className="wy-video-item" key={v.id}>
          <Link href={`/videos/${v.id}`} className="wy-thumb-btn">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="wy-thumb"
              src={v.thumb || "/uploads/archive/blog-pic1.jpg"}
              alt={v.title}
            />
            <span className="wy-thumb-play">▶</span>
          </Link>
          <div>
            <Link href={`/videos/${v.id}`} className="wy-song-link">
              {v.title}
            </Link>
            <div style={{ color: "#666", marginTop: 4 }}>点击打开播放页</div>
          </div>
        </div>
      ))}
      {moreHref ? (
        <div className="wy-more">
          <Link href={moreHref}>&gt;&gt; 查看全部影秀</Link>
        </div>
      ) : null}
    </>
  );
}