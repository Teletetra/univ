"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf } from "lucide-react";

import { HERBS } from "@/data/anime";

export default function HerbDrawer() {
  const [openId, setOpenId] = useState<string | null>("gardenia");
  const active = HERBS.find((h) => h.id === openId) ?? null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Leaf size={15} className="text-[#c2d39a]" />
        <p className="lab-label">The cabinet · six drawers</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {HERBS.map((herb, i) => {
          const open = openId === herb.id;
          return (
            <motion.button
              key={herb.id}
              onClick={() => setOpenId(open ? null : herb.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-xl border px-3 py-3 text-left transition ${
                open
                  ? "border-[#8a9a63] bg-[#1b2013]"
                  : "border-[#3f3a2a] bg-[#11150e] hover:border-[#6d7a4f] hover:bg-[#161b12]"
              }`}
            >
              <span
                className="absolute left-0 top-0 h-full w-[3px]"
                style={{ background: herb.accent, opacity: open ? 0.9 : 0.35 }}
              />
              <span className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#7b8560]">
                  {herb.index}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: herb.accent }}
                />
              </span>
              <span className="mt-1 block text-sm text-[#e6ecd6]">
                {herb.name}
              </span>
              <span className="mt-0.5 block truncate font-serif text-[10px] italic text-[#7b8560]">
                {herb.latin}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="rounded-xl border border-dashed border-[#4d5537] bg-[#0d100b] p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id ?? "empty"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            {active ? (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <p
                    className="font-serif text-lg"
                    style={{ color: active.accent }}
                  >
                    {active.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7b8560]">
                    drawer {active.index}
                  </p>
                </div>
                <p className="mt-3 font-hand text-lg leading-8 text-[#e9e4d4] md:text-xl">
                  {active.note}
                </p>
              </>
            ) : (
              <p className="text-sm text-[#7b8560]">
                The cabinet is closed. Pull a drawer.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
