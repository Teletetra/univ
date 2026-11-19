"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Lock, LockOpen } from "lucide-react";

import type { Confession } from "@/data/confessions";

/**
 * A sealed personal note. Closed by default so it reads as a secret,
 * then unfolds into handwriting when she chooses to open it.
 */
export default function ConfessionCard({
  confession,
  defaultOpen = false,
}: {
  confession: Confession;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.section
      layout
      className="relative overflow-hidden rounded-2xl border border-[#4a3b2a] bg-[#120f1a]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 0%, rgba(214,185,154,0.14), transparent 45%), radial-gradient(circle at 90% 100%, rgba(181,107,209,0.10), transparent 50%)",
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#4a3b2a] bg-[#1b1626] text-[#d6b99a]">
              {open ? <LockOpen size={13} /> : <Lock size={13} />}
            </span>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#d6b99a]">
              Confession · chapter {confession.chapter}
            </p>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-[#4a3b2a] bg-[#1b1626] px-3 py-1.5 text-[11px] text-[#e8ddf8] transition hover:border-[#6b5540] hover:bg-[#241c30]"
            aria-expanded={open}
          >
            <Heart size={12} className="text-[#d6b99a]" />
            {open ? "Seal it again" : "Open the note"}
          </button>
        </div>

        <h3 className="mt-4 font-serif text-xl text-[#e8ddf8] md:text-2xl">
          {confession.title}
        </h3>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4 border-t border-[#4a3b2a]/60 pt-4">
                {confession.body.map((para, i) => (
                  <p
                    key={i}
                    className="font-hand text-lg leading-8 text-[#efe6da] md:text-xl md:leading-9"
                  >
                    {para}
                  </p>
                ))}
                <p className="font-hand text-base text-[#d6b99a]">
                  {confession.signoff}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <p className="mt-2 text-xs text-[#7d7286]">
            Sealed. Some measurements wait for the observer to be ready.
          </p>
        )}
      </div>
    </motion.section>
  );
}
