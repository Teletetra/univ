"use client";

import { motion } from "framer-motion";
import { NOTEBOOK, type NotebookEntry } from "@/data/notebook";

export default function Notebook() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="lab-label">Research notebook</p>
          <h2 className="mt-1 font-serif text-2xl text-[#e8ddf8]">
            Field notes
          </h2>
        </div>
        <p className="text-xs text-[#7685a7]">
          {NOTEBOOK.length} entries
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {NOTEBOOK.map((entry, i) => (
          <NotebookCard key={entry.id} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}

function NotebookCard({
  entry,
  index,
}: {
  entry: NotebookEntry;
  index: number;
}) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-[#26324b] bg-[#11182b] p-5 transition hover:border-[#3b3470]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7685a7]">
            Entry {entry.number} · {entry.date}
          </p>
          <h3 className="mt-1 font-serif text-xl text-[#e8ddf8]">
            {entry.title}
          </h3>
        </div>
        {entry.sketch && <Sketch type={entry.sketch} />}
      </div>

      <p className="mt-3 font-hand text-base leading-7 text-[#c4b7ff]">
        {entry.body}
      </p>

      <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#7685a7]">
        <span className="h-px flex-1 bg-[#26324b]" />
        page {entry.number}
      </div>
    </motion.article>
  );
}

function Sketch({ type }: { type: NonNullable<NotebookEntry["sketch"]> }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      className="shrink-0 text-[#7469d8]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {type === "wave" && (
        <path d="M4 28 Q 14 10 24 28 T 44 28 T 52 28" strokeLinecap="round" />
      )}
      {type === "orbit" && (
        <>
          <circle cx="28" cy="28" r="4" fill="currentColor" stroke="none" />
          <ellipse cx="28" cy="28" rx="22" ry="10" />
          <ellipse
            cx="28"
            cy="28"
            rx="22"
            ry="10"
            transform="rotate(60 28 28)"
          />
        </>
      )}
      {type === "entangle" && (
        <>
          <circle cx="14" cy="28" r="3" fill="currentColor" stroke="none" />
          <circle cx="42" cy="28" r="3" fill="currentColor" stroke="none" />
          <path
            d="M14 28 Q 28 14 42 28 Q 28 42 14 28"
            strokeLinecap="round"
          />
        </>
      )}
      {type === "star" && (
        <>
          <path
            d="M28 8 L31 24 L48 28 L31 32 L28 48 L25 32 L8 28 L25 24 Z"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}