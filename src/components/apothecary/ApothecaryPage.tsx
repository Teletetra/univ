"use client";

import { FlaskConical, Flower2, NotebookPen } from "lucide-react";

import AnimeConstellation from "./AnimeConstellation";
import HerbDrawer from "./HerbDrawer";
import DiagnosisCard from "./DiagnosisCard";
import ConfessionCard from "@/components/ui/ConfessionCard";
import { confessionFor } from "@/data/confessions";
import { APOTHECARY_NOTE } from "@/data/anime";

export default function ApothecaryPage() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#c2d39a]">
          <Flower2 size={15} />
          CHAPTER 06 / THE APOTHECARY&apos;S GARDEN
        </div>
        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
          Observations on the worlds she inhabits
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-[#929fbd]">
          Not every experiment happens in a laboratory. Some happen in a story
          you keep returning to. This chapter is small on purpose — one show,
          one cabinet, and the reason I noticed it in the first place.
        </p>
      </section>

      {/* Constellation */}
      <section className="space-y-3">
        <SectionHeading
          icon={<FlaskConical size={15} className="text-[#c2d39a]" />}
          label="Field note 01"
          title="The narrative constellation"
          blurb="The worlds you disappear into for a few hours at a time."
        />
        <div className="panel p-3 md:p-4">
          <AnimeConstellation />
        </div>
      </section>

      {/* Cabinet */}
      <section className="space-y-3">
        <SectionHeading
          icon={<FlaskConical size={15} className="text-[#c2d39a]" />}
          label="Field note 02"
          title="Maomao's bench"
          blurb="Pull a drawer. Each one is an ingredient in why you love this show."
        />
        <div className="panel p-5 md:p-6">
          <HerbDrawer />
        </div>
      </section>

      {/* The handwritten note */}
      <section className="space-y-3">
        <SectionHeading
          icon={<NotebookPen size={15} className="text-[#d6b99a]" />}
          label="Field note 03"
          title="The apothecary's notebook"
          blurb="Tucked into the back of the cabinet, in handwriting that isn't Maomao's."
        />
        <div className="relative overflow-hidden rounded-2xl border border-[#4a3b2a] bg-[#171208] p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(214,185,154,0.10),transparent_50%)]" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#a08a6b]">
              {APOTHECARY_NOTE.heading}
            </p>
            <div className="mt-4 space-y-4">
              {APOTHECARY_NOTE.lines.map((line, i) => (
                <p
                  key={i}
                  className="font-hand text-lg leading-8 text-[#f2e8d5] md:text-xl md:leading-9"
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-5 font-hand text-base text-[#d6b99a]">
              {APOTHECARY_NOTE.signature}
            </p>
          </div>
        </div>
      </section>

      {/* Prescription */}
      <section className="space-y-3">
        <SectionHeading
          icon={<FlaskConical size={15} className="text-[#c2d39a]" />}
          label="Diagnosis"
          title="Prescription"
          blurb="Do not fold. Do not lose. Do not argue with the doctor."
        />
        <DiagnosisCard />
      </section>

      {/* Confession */}
      <ConfessionCard confession={confessionFor("apothecary")} />
    </div>
  );
}

function SectionHeading({
  icon,
  label,
  title,
  blurb,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  blurb: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.26em] text-[#7b8560]">
          {label}
        </p>
        <h2 className="mt-1 font-serif text-xl text-[#e8e4d6]">{title}</h2>
        <p className="mt-1 text-xs text-[#8c8a78]">{blurb}</p>
      </div>
    </div>
  );
}
