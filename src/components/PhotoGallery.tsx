"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Photo = { src: string; caption?: string };
type Album = {
  id: string;
  name: string;
  cover: string;
  photos: Photo[];
};

export function PhotoGallery({
  albums,
  compact,
}: {
  albums: Album[];
  compact?: boolean;
}) {
  const allPhotos = useMemo(
    () =>
      albums.flatMap((a) =>
        a.photos.map((p) => ({ ...p, album: a.name, albumId: a.id }))
      ),
    [albums]
  );

  const [activeAlbum, setActiveAlbum] = useState<string | "all">(
    compact ? "all" : albums[0]?.id || "all"
  );
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos =
    activeAlbum === "all"
      ? allPhotos
      : allPhotos.filter((p) => p.albumId === activeAlbum);

  const preview = compact ? photos.slice(0, 8) : photos;

  function openAt(index: number) {
    setLightbox(index);
  }

  function shift(delta: number) {
    if (lightbox === null || photos.length === 0) return;
    setLightbox((lightbox + delta + photos.length) % photos.length);
  }

  return (
    <div>
      {!compact && (
        <div className="wy-album-tabs">
          <button
            type="button"
            className={activeAlbum === "all" ? "on" : undefined}
            onClick={() => setActiveAlbum("all")}
          >
            全部
          </button>
          {albums.map((a) => (
            <button
              key={a.id}
              type="button"
              className={activeAlbum === a.id ? "on" : undefined}
              onClick={() => setActiveAlbum(a.id)}
            >
              {a.name} ({a.photos.length})
            </button>
          ))}
        </div>
      )}

      <div className="wy-alt">
        当前显示 <span>{preview.length}</span> 张
        {!compact ? ` / 共 ${photos.length} 张` : ""}
      </div>

      <div className="wy-photos wy-photos-lg">
        {preview.map((p, i) => (
          <button
            key={p.src + i}
            type="button"
            className="wy-photo-btn"
            onClick={() => openAt(i)}
            title={p.caption || "点击查看"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="wy-photo" src={p.src} alt={p.caption || `photo-${i + 1}`} />
          </button>
        ))}
      </div>

      {compact ? (
        <div className="wy-more">
          <Link href="/photos">&gt;&gt; 进入完整相册</Link>
        </div>
      ) : null}

      {lightbox !== null && photos[lightbox] ? (
        <div
          className="wy-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="wy-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[lightbox].src} alt={photos[lightbox].caption || ""} />
            <div className="wy-lightbox-cap">
              {photos[lightbox].caption || photos[lightbox].album}
              <span>
                {lightbox + 1}/{photos.length}
              </span>
            </div>
            <div className="wy-lightbox-nav">
              <button type="button" onClick={() => shift(-1)}>
                上一张
              </button>
              <button type="button" onClick={() => setLightbox(null)}>
                关闭
              </button>
              <button type="button" onClick={() => shift(1)}>
                下一张
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}