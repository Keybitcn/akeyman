"use client";

import Link from "next/link";
import { useMediaPlayer, type PlayableTrack } from "@/components/MediaPlayerContext";

type Video = {
  id: string;
  title: string;
  thumb: string;
  youtubeId: string;
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
  const { play, current, playing } = useMediaPlayer();
  const list = limit ? videos.slice(0, limit) : videos;
  const queue: PlayableTrack[] = videos.map((v) => ({
    id: v.id,
    title: v.title,
    youtubeId: v.youtubeId,
    kind: "video" as const,
  }));

  return (
    <>
      {list.map((v) => {
        const active = current?.id === v.id && playing;
        return (
          <div className="wy-video-item" key={v.id}>
            <button
              type="button"
              className="wy-thumb-btn"
              onClick={() =>
                play(
                  {
                    id: v.id,
                    title: v.title,
                    youtubeId: v.youtubeId,
                    kind: "video",
                  },
                  queue
                )
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="wy-thumb" src={v.thumb} alt={v.title} />
              <span className="wy-thumb-play">{active ? "♪" : "▶"}</span>
            </button>
            <div>
              <button
                type="button"
                className="wy-song-link"
                onClick={() =>
                  play(
                    {
                      id: v.id,
                      title: v.title,
                      youtubeId: v.youtubeId,
                      kind: "video",
                    },
                    queue
                  )
                }
              >
                {v.title}
              </button>
              {active ? (
                <div style={{ color: "#c00", marginTop: 4 }}>正在本站播放…</div>
              ) : null}
            </div>
          </div>
        );
      })}
      {moreHref ? (
        <div className="wy-more">
          <Link href={moreHref}>&gt;&gt; 查看全部影秀</Link>
        </div>
      ) : null}
    </>
  );
}