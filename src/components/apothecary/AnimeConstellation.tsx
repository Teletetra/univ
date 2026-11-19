"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkle } from "lucide-react";

import { ANIME_STARS, type AnimeStar } from "@/data/anime";

const W = 900;
const H = 420;

export default function AnimeConstellation() {
  const [selected, setSelected] = useState<AnimeStar | null>(null);

  const linked = ANIME_STARS.filter((s) => s.id !== "apothecary-diaries");

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-[#3f3a2a] bg-[#0a0c09]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(190,205,150,0.14),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(214,185,154,0.08),transparent_45%)]" />

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="relative block w-full"
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <defs>
            <filter id="garden-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="garden-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="55%" stopColor="#eef2d8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c2d39a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* faint field stars */}
          {Array.from({ length: 70 }).map((_, i) => (
            <circle
              key={`bg-${i}`}
              cx={(i * 149.3) % W}
              cy={(i * 67.7) % H}
              r={0.4 + ((i * 11) % 9) / 10}
              fill="#c2d39a"
              opacity={0.22}
            />
          ))}

          {/* threads from the bright star to the others */}
          {linked.map((s, i) => (
            <motion.line
              key={`link-${s.id}`}
              x1={0.5 * W}
              y1={0.3 * H}
              x2={s.x * W}
              y2={s.y * H}
              stroke="rgba(194,211,154,0.22)"
              strokeWidth={1}
              strokeDasharray="3 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.5 + i * 0.12 }}
            />
          ))}

          {ANIME_STARS.map((s, i) => {
            const cx = s.x * W;
            const cy = s.y * H;
            const r = s.major ? 7 : 4.5;
            const active = selected?.id === s.id;

            return (
              <g
                key={s.id}
                style={{ cursor: "pointer", pointerEvents: "all" }}
                onClick={() => setSelected(s)}
              >
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r * (active ? 4 : 3)}
                  fill="#c2d39a"
                  opacity={active ? 0.35 : 0.16}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.12 }}
                  style={{ filter: "url(#garden-glow)" }}
                />
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="url(#garden-fill)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                />
                <text
                  x={cx + 12}
                  y={cy + 4}
                  fill={s.major ? "#f2f4e6" : "#b9c69a"}
                  fontSize={s.major ? 13 : 10}
                  fontFamily="Inter, sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="relative flex items-center justify-between border-t border-[#3f3a2a] bg-[#0d100b]/85 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2 text-xs text-[#b9c69a]">
            <Sparkle size={13} />
            Click a star to open the world
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7b8560]">
            Narrative constellation
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected?.id ?? "none"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="min-h-[92px] rounded-xl border border-[#3f3a2a] bg-[#0d100b] p-4"
        >
          {selected ? (
            <>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#7b8560]">
                {selected.show}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#dbe3c8]">
                {selected.note}
              </p>
            </>
          ) : (
            <p className="text-sm leading-7 text-[#7b8560]">
              Every star here is a world you vanish into for a few hours. I keep
              a map of them, the way you keep a map of the places that made you.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
