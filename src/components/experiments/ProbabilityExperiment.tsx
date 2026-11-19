"use client";

import { useMemo, useState } from "react";
import { Atom, Info } from "lucide-react";

import WavefunctionCanvas from "./probability/WavefunctionCanvas";
import EnergyLadder from "./probability/EnergyLadder";
import ObservationPanel from "./probability/ObservationPanel";
import ConfessionCard from "@/components/ui/ConfessionCard";
import { confessionFor } from "@/data/confessions";

import { energyOf, classicalTurning } from "@/physics/harmonic-oscillator";

export default function ProbabilityExperiment() {
  const [n, setN] = useState(0);
  const [highestLevel, setHighestLevel] = useState(0);
  const [showPsi, setShowPsi] = useState(false);
  const [showClassical, setShowClassical] = useState(true);

  const a = classicalTurning(n);

  const selectLevel = (next: number) => {
    setN(next);
    setHighestLevel((h) => Math.max(h, next));
  };

  const stateLabel = useMemo(() => {
    if (n === 0) return "Ground state · symmetric, Gaussian";
    if (n % 2 === 0) return "Even state · symmetric, n nodes";
    return "Odd state · antisymmetric, n nodes";
  }, [n]);

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#a99aff]">
          <Atom size={15} />
          EXPERIMENT 03 / QUANTUM STATES
        </div>
        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
          The Probability of You
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-[#929fbd]">
          A quantum harmonic oscillator. Each energy level has a different
          probability density{" "}
          <code className="text-[#c4b7ff]">|ψₙ(ξ)|²</code> and a different
          shape of existence. Climb the ladder and see what each one reveals.
        </p>
      </section>

      {/* Plot + ladder */}
      <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="panel space-y-4 p-4 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-medium">Wavefunction</h2>
              <p className="mt-1 text-xs text-[#929fbd]">
                {stateLabel} · turning points at ξ = ±{a.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setShowPsi((v) => !v)}
                className={`rounded-lg border px-3 py-1.5 transition ${
                  showPsi
                    ? "border-[#7469d8] bg-[#292443] text-[#d4c9ff]"
                    : "border-[#26324b] text-[#929fbd] hover:bg-[#18223a]"
                }`}
              >
                ψₙ
              </button>
              <button
                onClick={() => setShowClassical((v) => !v)}
                className={`rounded-lg border px-3 py-1.5 transition ${
                  showClassical
                    ? "border-[#7469d8] bg-[#292443] text-[#d4c9ff]"
                    : "border-[#26324b] text-[#929fbd] hover:bg-[#18223a]"
                }`}
              >
                Classical
              </button>
            </div>
          </div>

          <WavefunctionCanvas
            n={n}
            showPsi={showPsi}
            showClassical={showClassical}
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Quantum number" value={`n = ${n}`} />
            <Stat label="Energy" value={`${energyOf(n).toFixed(1)} ℏω`} />
            <Stat label="Turning point" value={`±${a.toFixed(2)}`} />
            <Stat label="Nodes" value={String(n)} />
          </div>
        </div>

        <div className="panel p-4 md:p-6">
          <EnergyLadder current={n} onSelect={selectLevel} />
        </div>
      </section>

      {/* Observations */}
      <section className="panel p-5 md:p-6">
        <ObservationPanel highestLevel={highestLevel} />
      </section>

      {/* Scientific note */}
      <section className="panel flex gap-3 p-4 text-xs leading-6 text-[#929fbd]">
        <Info size={16} className="mt-0.5 shrink-0 text-[#b8a4ff]" />
        <p>
          The harmonic oscillator is one of the few quantum systems with exact
          closed-form solutions. The wavefunctions are Hermite polynomials
          multiplied by a Gaussian, and the energy levels are evenly spaced:
          Eₙ = ℏω(n + ½). The dashed curve shows the classical probability
          density, which diverges at the turning points — a reminder that
          quantum and classical pictures differ most strongly at the edges.
        </p>
      </section>

      <ConfessionCard confession={confessionFor("probability")} />
    </div>
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