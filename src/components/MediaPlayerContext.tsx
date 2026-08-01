"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type PlayableTrack = {
  id: string;
  title: string;
  artist?: string;
  src: string;
  kind?: "song" | "radio";
};

type MediaPlayerContextValue = {
  current: PlayableTrack | null;
  queue: PlayableTrack[];
  playing: boolean;
  play: (track: PlayableTrack, queue?: PlayableTrack[]) => void;
  toggle: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const MediaPlayerContext = createContext<MediaPlayerContextValue | null>(null);

export function MediaPlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<PlayableTrack | null>(null);
  const [queue, setQueue] = useState<PlayableTrack[]>([]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((track: PlayableTrack, nextQueue?: PlayableTrack[]) => {
    setCurrent(track);
    if (nextQueue) setQueue(nextQueue);
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (!current) return;
    void audioRef.current?.play().catch(() => undefined);
    setPlaying(true);
  }, [current]);

  const toggle = useCallback(() => {
    if (!current) return;
    if (playing) pause();
    else resume();
  }, [current, playing, pause, resume]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    const url = current.src
      .split("/")
      .map((seg, i) => (i === 0 || seg === "" ? seg : encodeURIComponent(seg)))
      .join("/");
    const absolute = new URL(url, window.location.origin).href;
    if (audio.src !== absolute) {
      audio.src = url;
    }
    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [current, playing]);

  const value = useMemo(
    () => ({
      current,
      queue,
      playing,
      play,
      toggle,
      pause,
      resume,
      stop,
      next,
      prev,
      audioRef,
    }),
    [current, queue, playing, play, toggle, pause, resume, stop, next, prev]
  );

  return (
    <MediaPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={() => next()}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        style={{ display: "none" }}
      />
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