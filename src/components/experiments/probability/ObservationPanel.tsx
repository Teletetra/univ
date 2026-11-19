"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { OBSERVATIONS } from "@/data/observations";
import { LEVELS } from "@/physics/harmonic-oscillator";

export default function ObservationPanel({
  highestLevel,
}: {
  highestLevel: number;
}) {
  const unlocked = LEVELS.filter((l) => l.n <= highestLevel).map(
    (l) => OBSERVATIONS.find((o) => o.id === l.observationId)!
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-[#b8a4ff]" />
        <p className="lab-label">
          Observations · {unlocked.length} / {LEVELS.length} unlocked
        </p>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {unlocked.map((obs, i) => (
            <motion.div
              key={obs.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl border border-[#26324b] bg-[#0b1224] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-[#7685a7]">
                  Observation {String(i + 1).padStart(2, "0")}
                </p>
                <span className="text-[10px] text-[#b8a4ff]">
                  {obs.title}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-[#c4b7ff]">
                {obs.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {highestLevel < LEVELS.length - 1 && (
          <p className="text-xs text-[#7685a7]">
            Climb to the next energy level to unlock another observation.
          </p>
        )}
      </div>

      {highestLevel >= LEVELS.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#3b3470] bg-[#1d1a36] p-5"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#b8a4ff]">
            All observations unlocked
          </p>
          <p className="mt-3 font-hand text-lg leading-8 text-[#e8ddf8]">
            “If I had to choose what to spend more time discovering, it would
            still be you.”
          </p>
          <p className="mt-2 font-hand text-base text-[#b8a4ff]">
            — kanishk
          </p>
        </motion.div>
      )}
    </div>
  );
}