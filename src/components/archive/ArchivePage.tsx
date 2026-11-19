"use client";

import { Orbit } from "lucide-react";

import Constellation from "./Constellation";
import Notebook from "./Notebook";
import ConfessionCard from "@/components/ui/ConfessionCard";
import { confessionFor } from "@/data/confessions";
import { MEMORIES } from "@/data/memories";
import { NOTEBOOK } from "@/data/notebook";

export default function ArchivePage() {
  const majorStars = MEMORIES.filter((m) => m.major).length;

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#a99aff]">
          <Orbit size={15} />
          OBSERVATION ARCHIVE / CHAPTER 04
        </div>
        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
          Every Little Detail, Remembered
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-[#929fbd]">
          Some things deserve to be appreciated. A constellation of moments, and
          the field notes that go with them.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-3 sm:grid-cols-3">
        <Stat label="Memories catalogued" value={String(MEMORIES.length)} />
        <Stat label="Anchors" value={String(majorStars)} />
        <Stat label="Field notes" value={String(NOTEBOOK.length)} />
      </section>

      {/* Constellation */}
      <section className="panel p-3 md:p-4">
        <Constellation />
      </section>

      {/* Notebook */}
      <section className="panel p-5 md:p-6">
        <Notebook />
      </section>

      <ConfessionCard confession={confessionFor("archive")} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#26324b] bg-[#0b1224] p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[#7685a7]">
        {label}
      </p>
      <p className="mt-1 font-mono text-lg text-[#e8ddf8]">{value}</p>
    </div>
  );
}
