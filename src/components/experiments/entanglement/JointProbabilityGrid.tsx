"use client";

import { motion } from "framer-motion";
import type { JointProbability } from "@/physics/entanglement";

export default function JointProbabilityGrid({
  probabilities,
  basis,
}: {
  probabilities: JointProbability[];
  basis: string;
}) {
  const lookup = (a: number, b: number) =>
    probabilities.find((p) => p.a === a && p.b === b)?.p ?? 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="lab-label">Joint probability P(a,b)</p>
        <span className="text-xs text-[#b8a4ff]">basis · {basis}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((a) =>
          [0, 1].map((b) => {
            const p = lookup(a, b);
            return (
              <motion.div
                key={`${a}${b}`}
                className="relative overflow-hidden rounded-xl border border-[#26324b] bg-[#0b1224] p-3"
                animate={{ borderColor: p > 0.01 ? "#3b3470" : "#26324b" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[#929fbd]">
                    |{a}{b}⟩
                  </span>
                  <span className="font-mono text-xs text-[#b8a4ff]">
                    {(p * 100).toFixed(0)}%
                  </span>
                </div>

                {/* Probability bar */}
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1a2238]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#7469d8] to-[#b8a4ff]"
                    animate={{ width: `${p * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <p className="text-[10px] leading-5 text-[#7685a7]">
        Column index b, row index a. P(00) + P(01) + P(10) + P(11) = 1.
      </p>
    </div>
  );
}