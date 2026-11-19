"use client";

import { LEVELS, energyOf } from "@/physics/harmonic-oscillator";
import { motion } from "framer-motion";

export default function EnergyLadder({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (n: number) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="lab-label">Energy ladder · Eₙ = ℏω(n + ½)</p>
      <div className="flex flex-col-reverse gap-2">
        {LEVELS.map((level) => {
          const active = current === level.n;
          const energy = energyOf(level.n);
          return (
            <button
              key={level.n}
              onClick={() => onSelect(level.n)}
              className={`group relative flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${
                active
                  ? "border-[#7469d8] bg-[#292443] text-[#d4c9ff]"
                  : "border-[#26324b] text-[#929fbd] hover:bg-[#18223a]"
              }`}
            >
              <span className="font-mono text-xs text-[#7685a7]">
                n = {level.n}
              </span>
              <span className="flex-1">{level.label}</span>
              <span className="font-mono text-xs text-[#b8a4ff]">
                {energy} ℏω
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#26324b] bg-[#0b1224] p-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#7685a7]">
          E_{current}
        </span>
        <span className="flex-1 font-mono text-sm text-[#e8ddf8]">
          {(current + 0.5).toFixed(1)} ℏω
        </span>
        <motion.div
          key={current}
          className="h-1.5 w-16 overflow-hidden rounded-full bg-[#1a2238]"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#7469d8] to-[#b8a4ff]"
            initial={{ width: 0 }}
            animate={{ width: `${((current + 0.5) / 4.5) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}