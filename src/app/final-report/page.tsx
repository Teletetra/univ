import AppShell from "@/components/shell/AppShell";
import ConfessionCard from "@/components/ui/ConfessionCard";
import { confessionFor } from "@/data/confessions";
import { FINAL_LETTER } from "@/data/letters";

export default function Page() {
  return (
    <AppShell active="Final report">
      <div className="space-y-7">
        <section className="space-y-2">
          <p className="lab-label">Chapter 05 · Personal research archive</p>
          <h1 className="font-serif text-3xl md:text-4xl">
            An Observation Beyond Measurement
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#929fbd]">
            Every experiment so far has been a way of saying the same thing in
            different units. This is the plain-language version.
          </p>
        </section>

        <section className="panel relative overflow-hidden p-6 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(232,221,248,0.10),transparent_55%)]" />
          <div className="relative max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8a4ff]">
              Final report · sealed
            </p>
            <p className="mt-5 whitespace-pre-line font-hand text-xl leading-9 text-[#e8ddf8] md:text-2xl md:leading-[2.4rem]">
              {FINAL_LETTER}
            </p>
          </div>
        </section>

        <ConfessionCard confession={confessionFor("final")} defaultOpen />
      </div>
    </AppShell>
  );
}
