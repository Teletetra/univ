"use client";

import { motion } from "framer-motion";

export default function ConnectionLine({
  active,
  strength,
  correlated,
}: {
  active: boolean;
  strength: number; // 0 to 1, grows with measurements
  correlated: boolean;
}) {
  const color = correlated ? "#b8a4ff" : "#7ee3ee";
  const opacity = active ? 0.25 + strength * 0.6 : 0.08;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        <defs>
          <filter id="glow-line">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id="line-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <motion.line
          x1="30"
          y1="100"
          x2="370"
          y2="100"
          stroke="url(#line-gradient)"
          strokeWidth={active ? 2.5 : 1.5}
          filter="url(#glow-line)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity,
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Traveling dot — a visual ripple, not a message */}
        {active && (
          <motion.circle
            r="3"
            fill={color}
            filter="url(#glow-line)"
            animate={{
              cx: [30, 370, 30],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (1 - strength) * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    </div>
  );
}