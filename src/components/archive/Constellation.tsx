"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { MEMORIES, LINKS, type Memory } from "@/data/memories";

export default function Constellation() {
  const [selected, setSelected] = useState<Memory | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  // Reveal stars in staggered order on mount
  useEffect(() => {
    MEMORIES.forEach((m, i) => {
      const timeout = setTimeout(() => {
        setRevealed((prev) => new Set(prev).add(m.id));
      }, 400 + i * 200);
      return () => clearTimeout(timeout);
    });
  }, []);

  const findMemory = (id: string) =>
    MEMORIES.find((m) => m.id === id)!;

  const layout = useMemo(() => {
    const W = 1000;
    const H = 640;
    return { W, H };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#26324b] bg-[#05080f]">
      {/* Ambient gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(116,105,216,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(214,185,154,0.06),transparent_40%)]" />
      </div>

      {/* Small static stars for depth */}
      <svg
        viewBox={`0 0 ${layout.W} ${layout.H}`}
        className="relative block w-full"
        style={{ aspectRatio: "1000 / 640" }}
      >
        <defs>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="star-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="55%" stopColor="#e8ddf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b8a4ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background stars — decorative, deterministic */}
        {Array.from({ length: 90 }).map((_, i) => {
          const sx = ((i * 137.5) % 1000);
          const sy = ((i * 73.3) % 640);
          const sr = 0.4 + ((i * 13) % 10) / 10;
          return (
            <circle
              key={`bg-${i}`}
              cx={sx}
              cy={sy}
              r={sr}
              fill="#929fbd"
              opacity={0.25}
            />
          );
        })}

        {/* Links between memories */}
        {LINKS.map((link, i) => {
          const from = findMemory(link.from);
          const to = findMemory(link.to);
          const x1 = from.x * layout.W;
          const y1 = from.y * layout.H;
          const x2 = to.x * layout.W;
          const y2 = to.y * layout.H;

          return (
            <motion.line
              key={`${link.from}-${link.to}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(184,164,255,0.25)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 1.4 + i * 0.12 }}
            />
          );
        })}

        {/* Memory stars */}
        {MEMORIES.map((m, i) => {
          const cx = m.x * layout.W;
          const cy = m.y * layout.H;
          const r = m.major ? 8 : 5;
          const isRevealed = revealed.has(m.id);

          return (
            <g
              key={m.id}
              style={{ cursor: "pointer", pointerEvents: "all" }}
              onClick={() => setSelected(m)}
            >
              <motion.circle
                cx={cx}
                cy={cy}
                r={r * 3}
                fill="#b8a4ff"
                opacity={0}
                initial={{ scale: 0 }}
                animate={{ scale: isRevealed ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
                style={{ filter: "url(#star-glow)" }}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={r}
                fill="url(#star-fill)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isRevealed ? 1 : 0,
                  opacity: isRevealed ? 1 : 0,
                }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              />
              <motion.text
                x={cx + 12}
                y={cy + 4}
                fill={m.major ? "#e8ddf8" : "#929fbd"}
                fontSize={m.major ? 14 : 11}
                fontFamily="Inter, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealed ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                style={{ pointerEvents: "none" }}
              >
                {m.label}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Footer hint */}
      <div className="relative flex items-center justify-between border-t border-[#26324b] bg-[#0b1224]/85 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2 text-xs text-[#929fbd]">
          <Sparkles size={14} className="text-[#b8a4ff]" />
          Click any star to open a memory
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#7685a7]">
          Memory constellation
        </span>
      </div>

      {/* Selected memory modal */}
      {selected && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[#05080f]/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="panel max-w-md p-6"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#b8a4ff]">
                  {selected.category} · {selected.date}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-[#e8ddf8]">
                  {selected.label}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-[#7685a7] hover:text-[#e8ddf8]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#929fbd]">
              {selected.message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}