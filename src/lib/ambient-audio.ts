"use client";

import { useEffect, useRef, useState } from "react";

export function useAmbientAudio(src = "/audio/ambient.mp3") {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;

    const onCanPlay = () => setAvailable(true);
    const onError = () => setAvailable(false);

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!playing) {
      try {
        audio.volume = 0;
        await audio.play();
        // fade in
        const target = 0.35;
        const t = setInterval(() => {
          audio.volume = Math.min(audio.volume + 0.02, target);
          if (audio.volume >= target) clearInterval(t);
        }, 60);
        setPlaying(true);
      } catch {
        // autoplay blocked — ignore
      }
    } else {
      // fade out
      const t = setInterval(() => {
        audio.volume = Math.max(audio.volume - 0.03, 0);
        if (audio.volume <= 0) {
          clearInterval(t);
          audio.pause();
          setPlaying(false);
        }
      }, 60);
    }
  };

  return { playing, available, toggle };
}