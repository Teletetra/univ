import Link from "next/link";
import { ArrowRight, Atom, Sparkles } from "lucide-react";

import AppShell from "@/components/shell/AppShell";
import { PLANETS } from "@/data/universe";

export default function Page() {
  return (
    <AppShell active="Experiments">
      <div className="space-y-7">
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-xs tracking-widest text-[#a99aff]">
            <Atom size={15} />
            CHAPTER INDEX
          </div>
          <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
            Six Ways of Looking at the Same Thing
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[#929fbd]">
            Each chapter is a different instrument pointed at the same subject.
            Start anywhere. They all end in the same place.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {PLANETS.map((planet) => (
            <Link
              key={planet.id}
              href={planet.href}
              className="group panel relative overflow-hidden p-5 transition hover:border-[#3b3470] hover:bg-[#15203a]"
            >
              <span
                className="absolute left-0 top-0 h-full w-[3px]"
                style={{ background: planet.color, opacity: 0.7 }}
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7685a7]">
                    Chapter {planet.chapter}
                    {planet.kind === "story" && " · story"}
                  </p>
                  <h2 className="mt-1.5 font-serif text-xl text-[#e8ddf8]">
                    {planet.name}
                  </h2>
                  <p className="mt-0.5 text-xs text-[#b8a4ff]">
                    {planet.subtitle}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="mt-1 shrink-0 text-[#7685a7] transition group-hover:translate-x-0.5 group-hover:text-[#e8ddf8]"
                />
              </div>

              {planet.whisper && (
                <p className="mt-4 border-l-2 border-[#26324b] pl-3 font-hand text-base leading-7 text-[#c4b7ff]">
                  {planet.whisper}
                </p>
              )}

              {planet.achievement && (
                <p className="mt-4 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-[#7685a7]">
                  <Sparkles size={10} />
                  {planet.achievement}
                </p>
              )}
            </Link>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
