"use client";

import { useMediaPlayer } from "@/components/MediaPlayerContext";

export function FloatingPlayer() {
  const { current, playing, pause, resume, next, prev, stop } = useMediaPlayer();

  if (!current) return null;

  return (
    <div className="wy-player">
      <div className="wy-player-inner">
        <div className="wy-player-meta">
          <strong>{playing ? "▶ 正在播放" : "❚❚ 已暂停"}</strong>
          <span>
            {current.title}
            {current.artist ? ` - ${current.artist}` : ""}
          </span>
        </div>
        <div className="wy-player-controls">
          <button type="button" onClick={prev} title="上一首">
            ⏮
          </button>
          {playing ? (
            <button type="button" onClick={pause} title="暂停">
              ⏸
            </button>
          ) : (
            <button type="button" onClick={resume} title="继续">
              ▶
            </button>
          )}
          <button type="button" onClick={next} title="下一首">
            ⏭
          </button>
          <button type="button" onClick={stop} title="关闭">
            ✕
          </button>
        </div>
        <div className="wy-player-frame">
          {playing ? (
            <iframe
              key={`${current.id}-play`}
              title={current.title}
              src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="wy-player-paused">
              已暂停：{current.title}
              <br />
              <button type="button" onClick={resume}>
                点此继续播放
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}