"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAmbientAudio } from "@/lib/ambient-audio";

export default function AmbientAudio() {
  const { playing, available, toggle } = useAmbientAudio();

  if (!available) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#26324b] bg-[#0d1425]/90 text-[#b8a4ff] backdrop-blur transition hover:bg-[#18223a]"
      aria-label={playing ? "Pause ambient audio" : "Play ambient audio"}
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}