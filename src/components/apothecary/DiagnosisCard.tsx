"use client";

import { motion } from "framer-motion";

import { PRESCRIPTION } from "@/data/anime";

export default function DiagnosisCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: -0.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative overflow-hidden rounded-sm bg-[#f6efe1] p-6 text-[#2a2318] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] md:p-8"
      style={{
        backgroundImage:
          "repeating-linear-gradient(transparent, transparent 30px, rgba(42,35,24,0.07) 31px)",
      }}
    >
      {/* perforated edge */}
      <div className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,transparent_0_6px,rgba(42,35,24,0.18)_6px_7px)]" />

      {/* prescription header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7a6a4d]">
            Dept. of Hopeless Observation
          </p>
          <h3 className="mt-1 font-serif text-2xl text-[#1f1a12]">
            Apothecary&apos;s Prescription
          </h3>
        </div>
        <div className="shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-[#7a6a4d]">
          <p>{PRESCRIPTION.number}</p>
          <p className="mt-1">{PRESCRIPTION.date}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-dashed border-[#c3b394] pt-5">
        <p className="font-serif text-5xl leading-none text-[#1f1a12]">℞</p>

        <ul className="mt-4 space-y-2.5">
          {PRESCRIPTION.lines.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 font-hand text-lg leading-7 text-[#2a2318]"
            >
              <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[#7a6a4d]" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 max-w-md text-xs leading-6 text-[#5c5140]">
          {PRESCRIPTION.advice}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-dashed border-[#c3b394] pt-4">
        <div>
          <p className="font-hand text-lg text-[#1f1a12]">
            {PRESCRIPTION.signoff}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a6a4d]">
            Signature on file
          </p>
        </div>

        {/* rubber stamp */}
        <div className="-rotate-6 rounded-md border-[3px] border-[#a33b3b]/70 px-3 py-1.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#a33b3b]/85">
            {PRESCRIPTION.stamp}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
