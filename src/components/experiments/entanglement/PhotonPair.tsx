"use client";

import { motion } from "framer-motion";
import type { QubitValue } from "@/physics/entanglement";

export default function PhotonPair({
  label,
  value,
  basis,
  measured,
  accent,
}: {
  label: string;
  value: QubitValue | null;
  basis: "Z" | "X" | "Y";
  measured: boolean;
  accent: string;
}) {
  const stateText =
    value === null ? "superposition" : `|${value}⟩ in ${basis}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#7685a7]">
        {label}
      </span>

      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Outer pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${accent}44` }}
          animate={{
            scale: measured ? [1, 1.08, 1] : [1, 1.15, 1],
            opacity: measured ? 0.35 : [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: measured ? 1.6 : 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
          }}
          animate={{
            opacity: measured ? 0.85 : [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center value */}
        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-full border font-mono text-3xl"
          style={{
            borderColor: value === null ? "#26324b" : accent,
            background:
              value === null
                ? "#0b1224"
                : `linear-gradient(135deg, #1d1a36, #0b1224)`,
            color: value === null ? "#7685a7" : accent,
            boxShadow:
              value === null
                ? "none"
                : `0 0 40px ${accent}55, inset 0 0 20px ${accent}22`,
          }}
          animate={{
            scale: measured ? [1, 1.06, 1] : 1,
          }}
          transition={{ duration: 0.6 }}
        >
          {value === null ? "?" : value}
        </motion.div>
      </div>

      <p className="text-xs text-[#929fbd]">{stateText}</p>
    </div>
  );
}