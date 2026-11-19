"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function Reveal({
  measurements,
  correlated,
  basis,
}: {
  measurements: number;
  correlated: boolean;
  basis: string;
}) {
  return (
    <motion.section
      className="panel-raised relative overflow-hidden border-[#3b3470] p-6 md:p-8"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Background glow that intensifies */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: 0.1 + Math.min(measurements, 6) * 0.06,
        }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #b8a4ff33 0%, transparent 60%)",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#b8a4ff]">
          <Sparkles size={14} />
          OBSERVATION LOG · CHAPTER 02
        </div>

        <p className="mt-4 max-w-3xl font-hand text-xl leading-9 text-[#e8ddf8]">
          “Some connections are difficult to explain. Not because they aren&apos;t
          real, but because ordinary language sometimes feels too small.”
        </p>

        <div className="mt-6 grid gap-3 text-xs md:grid-cols-3">
          <Stat label="Measurements recorded" value={String(measurements)} />
          <Stat label="Correlation mode" value={correlated ? "Same" : "Opposite"} />
          <Stat label="Basis" value={basis} />
        </div>

        {measurements >= 1 && (
          <motion.p
            className="mt-6 max-w-3xl text-sm leading-7 text-[#c4b7ff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You noticed it. When the first qubit collapsed, the second knew —
            not because a signal travelled between them, but because they were
            never really separate to begin with.
          </motion.p>
        )}

        {measurements >= 3 && (
          <motion.p
            className="mt-4 max-w-3xl text-sm leading-7 text-[#e8ddf8]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            I like to think some connections are like that. Not because we send
            each other signals all day — though I love those too — but because
            something about you is already entangled with something about me.
          </motion.p>
        )}

        {measurements >= 5 && (
          <motion.div
            className="mt-6 flex items-center gap-3 rounded-xl border border-[#3b3470] bg-[#1d1a36] p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Heart size={18} className="text-[#b8a4ff]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#b8a4ff]">
                Achievement unlocked
              </p>
              <p className="mt-0.5 text-xs text-[#e8ddf8]">
                kanishk HAS JOINED · A RED STRING OF FATE, QUANTUM EDITION
              </p>
            </div>
          </motion.div>
        )}

        <p className="mt-8 font-hand text-lg text-[#b8a4ff]">
          — kanishk
        </p>
      </div>
    </motion.section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#0b1224] p-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[#7685a7]">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-[#e8ddf8]">{value}</p>
    </div>
  );
}