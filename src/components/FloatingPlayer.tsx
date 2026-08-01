"use client";

import { useEffect, useState } from "react";
import { useMediaPlayer } from "@/components/MediaPlayerContext";

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function FloatingPlayer() {
  const { current, playing, toggle, next, prev, stop, audioRef } = useMediaPlayer();
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setTime(audio.currentTime || 0);
    const onMeta = () => setDuration(audio.duration || 0);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
    };
  }, [audioRef, current]);

  if (!current) return null;

  const pct = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <div className="wy-mp3bar">
      <div className="wy-mp3bar-inner">
        <button type="button" className="wy-mp3-btn" onClick={prev} title="上一首">
          ⏮
        </button>
        <button type="button" className="wy-mp3-btn main" onClick={toggle} title="播放/暂停">
          {playing ? "⏸" : "▶"}
        </button>
        <button type="button" className="wy-mp3-btn" onClick={next} title="下一首">
          ⏭
        </button>

        <div className="wy-mp3-info">
          <div className="wy-mp3-title">
            {current.title}
            {current.artist ? ` - ${current.artist}` : ""}
          </div>
          <div className="wy-mp3-progress-wrap">
            <input
              type="range"
              min={0}
              max={1000}
              value={Math.round(pct * 10)}
              className="wy-mp3-range"
              onChange={(e) => {
                const audio = audioRef.current;
                if (!audio || !duration) return;
                const v = Number(e.target.value) / 1000;
                audio.currentTime = v * duration;
                setTime(audio.currentTime);
              }}
            />
            <span className="wy-mp3-time">
              {formatTime(time)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        <button type="button" className="wy-mp3-btn" onClick={stop} title="关闭">
          ✕
        </button>
      </div>
    </div>
  );
}