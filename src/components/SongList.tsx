"use client";

import Link from "next/link";
import { useMediaPlayer, type PlayableTrack } from "@/components/MediaPlayerContext";

type Song = {
  id: string;
  title: string;
  artist?: string;
  youtubeId: string;
};

export function SongList({
  songs,
  limit,
  moreHref,
  kind = "song",
}: {
  songs: Song[];
  limit?: number;
  moreHref?: string;
  kind?: "song" | "radio";
}) {
  const { play, current, playing } = useMediaPlayer();
  const list = limit ? songs.slice(0, limit) : songs;
  const queue: PlayableTrack[] = songs.map((s) => ({
    id: s.id,
    title: s.title,
    artist: s.artist,
    youtubeId: s.youtubeId,
    kind,
  }));

  return (
    <>
      <table className="wy-table">
        <thead>
          <tr>
            <th>歌曲名</th>
            <th>歌手</th>
            <th>收听</th>
          </tr>
        </thead>
        <tbody>
          {list.map((song) => {
            const active = current?.id === song.id && playing;
            return (
              <tr key={song.id} className={active ? "wy-row-active" : undefined}>
                <td>
                  <button
                    type="button"
                    className="wy-song-link"
                    onClick={() =>
                      play(
                        {
                          id: song.id,
                          title: song.title,
                          artist: song.artist,
                          youtubeId: song.youtubeId,
                          kind,
                        },
                        queue
                      )
                    }
                  >
                    {song.title}
                  </button>
                </td>
                <td>{song.artist || "-"}</td>
                <td className="play">
                  <button
                    type="button"
                    className={`wy-play ${active ? "on" : ""}`}
                    title={active ? "播放中" : "点击播放"}
                    onClick={() =>
                      play(
                        {
                          id: song.id,
                          title: song.title,
                          artist: song.artist,
                          youtubeId: song.youtubeId,
                          kind,
                        },
                        queue
                      )
                    }
                  >
                    {active ? "♪" : "▶"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {moreHref ? (
        <div className="wy-more">
          <Link href={moreHref}>&gt;&gt; 进入完整歌秀</Link>
        </div>
      ) : null}
    </>
  );
}