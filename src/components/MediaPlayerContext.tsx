"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PlayableTrack = {
  id: string;
  title: string;
  artist?: string;
  youtubeId: string;
  kind?: "song" | "radio" | "video";
};

type MediaPlayerContextValue = {
  current: PlayableTrack | null;
  queue: PlayableTrack[];
  playing: boolean;
  play: (track: PlayableTrack, queue?: PlayableTrack[]) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
};

const MediaPlayerContext = createContext<MediaPlayerContextValue | null>(null);

export function MediaPlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<PlayableTrack | null>(null);
  const [queue, setQueue] = useState<PlayableTrack[]>([]);
  const [playing, setPlaying] = useState(false);

  const play = useCallback((track: PlayableTrack, nextQueue?: PlayableTrack[]) => {
    setCurrent(track);
    if (nextQueue) setQueue(nextQueue);
    setPlaying(true);
  }, []);

  const pause = useCallback(() => setPlaying(false), []);
  const resume = useCallback(() => {
    if (current) setPlaying(true);
  }, [current]);
  const stop = useCallback(() => {
    setPlaying(false);
    setCurrent(null);
  }, []);

  const next = useCallback(() => {
    if (!current || queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === current.id);
    const n = queue[(idx + 1) % queue.length];
    if (n) {
      setCurrent(n);
      setPlaying(true);
    }
  }, [current, queue]);

  const prev = useCallback(() => {
    if (!current || queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === current.id);
    const p = queue[(idx - 1 + queue.length) % queue.length];
    if (p) {
      setCurrent(p);
      setPlaying(true);
    }
  }, [current, queue]);

  const value = useMemo(
    () => ({ current, queue, playing, play, pause, resume, stop, next, prev }),
    [current, queue, playing, play, pause, resume, stop, next, prev]
  );

  return (
    <MediaPlayerContext.Provider value={value}>
      {children}
    </MediaPlayerContext.Provider>
  );
}

export function useMediaPlayer() {
  const ctx = useContext(MediaPlayerContext);
  if (!ctx) {
    throw new Error("useMediaPlayer must be used within MediaPlayerProvider");
  }
  return ctx;
}