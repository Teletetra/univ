"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Reveal({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"collapse" | "bloom" | "fade">(
    "collapse"
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("bloom"), 1600);
    const t2 = setTimeout(() => setPhase("fade"), 2200);
    const t3 = setTimeout(onDone, 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  // 24 dots on a ring
  const dots = Array.from({ length: 24 });

  return (
    <AnimatePresence>
      {phase !== "fade" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#05080f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            viewBox="-100 -100 200 200"
            className="h-64 w-64"
            aria-hidden="true"
          >
            <defs>
              <filter id="reveal-glow">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {dots.map((_, i) => {
              const a = (i / dots.length) * Math.PI * 2;
              const R = 70;
              const x = Math.cos(a) * R;
              const y = Math.sin(a) * R;

              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={1.4}
                  fill="#b8a4ff"
                  initial={{ cx: x, cy: y, opacity: 0 }}
                  animate={
                    phase === "collapse"
                      ? { cx: 0, cy: 0, opacity: [0, 0.9, 0.9] }
                      : { cx: 0, cy: 0, opacity: 0 }
                  }
                  transition={{
                    duration: phase === "collapse" ? 1.6 : 0.4,
                    delay: i * 0.02,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            <motion.circle
              cx={0}
              cy={0}
              r={0}
              fill="#ffffff"
              filter="url(#reveal-glow)"
              animate={
                phase === "collapse"
                  ? { r: 0, opacity: 0 }
                  : { r: [0, 6, 2], opacity: [0, 1, 0.8] }
              }
              transition={{
                duration: phase === "collapse" ? 0.3 : 0.9,
                delay: phase === "collapse" ? 1.4 : 0,
              }}
            />
          </svg>

          <motion.p
            className="absolute bottom-[calc(50%-6rem)] text-[10px] uppercase tracking-[0.4em] text-[#7685a7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "collapse" ? 0.6 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            final observation
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}