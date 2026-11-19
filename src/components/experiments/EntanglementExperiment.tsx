"use client";

import { useMemo, useState } from "react";
import {
  Atom,
  Info,
  RotateCcw,
  Ruler,
  Zap,
} from "lucide-react";

import PhotonPair from "./entanglement/PhotonPair";
import ConnectionLine from "./entanglement/ConnectionLine";
import JointProbabilityGrid from "./entanglement/JointProbabilityGrid";
import Reveal from "./entanglement/Reveal";
import ConfessionCard from "@/components/ui/ConfessionCard";
import { confessionFor } from "@/data/confessions";

import {
  type Basis,
  type QubitValue,
  jointProbabilities,
  sampleOutcome,
  correlationLabel,
} from "@/physics/entanglement";

export default function EntanglementExperiment() {
  const [basis, setBasis] = useState<Basis>("Z");
  const [a, setA] = useState<QubitValue | null>(null);
  const [b, setB] = useState<QubitValue | null>(null);
  const [measurements, setMeasurements] = useState(0);
  const [history, setHistory] = useState<{ a: QubitValue; b: QubitValue }[]>(
    []
  );

  const probs = useMemo(() => jointProbabilities(basis), [basis]);
  const correlated = basis === "Z";

  const measure = () => {
    const outcome = sampleOutcome(basis);
    setA(outcome.a);
    setB(outcome.b);
    setMeasurements((m) => m + 1);
    setHistory((h) => [...h, outcome]);
  };

  const reset = () => {
    setA(null);
    setB(null);
    setMeasurements(0);
    setHistory([]);
  };

  const changeBasis = (next: Basis) => {
    setBasis(next);
    setA(null);
    setB(null);
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#a99aff]">
          <Atom size={15} />
          EXPERIMENT 02 / QUANTUM CORRELATIONS
        </div>
        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
          Entanglement
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-[#929fbd]">
          Two qubits in the Bell state <code className="text-[#c4b7ff]">|Φ⁺⟩ = (|00⟩ + |11⟩) / √2</code>.
          Measure one and watch the other respond. Not because a signal
          travelled — but because they were prepared as one state.
        </p>
      </section>

      {/* Qubit pair + connection */}
      <section className="panel relative overflow-hidden p-6 md:p-10">
        <ConnectionLine
          active={measurements > 0}
          strength={Math.min(measurements / 6, 1)}
          correlated={correlated}
        />

        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <PhotonPair
            label="Qubit A · Alpha"
            value={a}
            basis={basis}
            measured={a !== null}
            accent="#b8a4ff"
          />

          <div className="flex flex-col items-center gap-2 text-center">
            <Zap size={18} className="text-[#b8a4ff]" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#7685a7]">
              {correlationLabel(basis)}
            </p>
          </div>

          <PhotonPair
            label="Qubit B · Beta"
            value={b}
            basis={basis}
            measured={b !== null}
            accent="#7ee3ee"
          />
        </div>

        {/* Basis selector + measure */}
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <p className="mr-2 text-xs text-[#929fbd]">Measurement basis</p>

          {(["Z", "X", "Y"] as const).map((b) => (
            <button
              key={b}
              onClick={() => changeBasis(b)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                basis === b
                  ? "border-[#7469d8] bg-[#292443] text-[#d4c9ff]"
                  : "border-[#26324b] text-[#929fbd] hover:bg-[#18223a]"
              }`}
            >
              {b}
            </button>
          ))}

          <button
            onClick={measure}
            className="ml-2 rounded-lg bg-[#7469d8] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#8579e8]"
          >
            Measure pair
          </button>

          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-lg border border-[#26324b] px-4 py-2 text-xs text-[#c1b4ff] transition hover:bg-[#18223a]"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        {/* Correlation status */}
        <div className="relative mt-6 grid gap-3 text-xs md:grid-cols-3">
          <div className="rounded-xl bg-[#0b1224] p-3">
            <p className="text-[#929fbd]">Current basis</p>
            <p className="mt-1 font-mono text-sm text-[#e8ddf8]">{basis}</p>
          </div>
          <div className="rounded-xl bg-[#0b1224] p-3">
            <p className="text-[#929fbd]">Expected correlation</p>
            <p className="mt-1 font-mono text-sm text-[#e8ddf8]">
              {correlated ? "+1 (same)" : "−1 (opposite)"}
            </p>
          </div>
          <div className="rounded-xl bg-[#0b1224] p-3">
            <p className="text-[#929fbd]">Measurements</p>
            <p className="mt-1 font-mono text-sm text-[#e8ddf8]">
              {measurements}
            </p>
          </div>
        </div>
      </section>

      {/* Probability + history */}
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="panel p-5 md:p-6">
          <JointProbabilityGrid probabilities={probs} basis={basis} />
        </div>

        <div className="panel p-5 md:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Ruler size={16} className="text-[#b8a4ff]" />
            <p className="lab-label">Measurement history</p>
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-[#929fbd]">
              No measurements yet. Press{" "}
              <span className="text-[#c4b7ff]">Measure pair</span> to begin.
            </p>
          ) : (
            <div className="space-y-2">
              {history
                .slice()
                .reverse()
                .slice(0, 8)
                .map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-[#26324b] bg-[#0b1224] px-3 py-2 font-mono text-xs"
                  >
                    <span className="text-[#7685a7]">
                      #{history.length - i}
                    </span>
                    <span className="text-[#b8a4ff]">A = {h.a}</span>
                    <span className="text-[#7ee3ee]">B = {h.b}</span>
                    <span
                      className={
                        h.a === h.b ? "text-emerald-300" : "text-rose-300"
                      }
                    >
                      {h.a === h.b ? "same" : "opposite"}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Scientific note */}
      <section className="panel flex gap-3 p-4 text-xs leading-6 text-[#929fbd]">
        <Info size={16} className="mt-0.5 shrink-0 text-[#b8a4ff]" />
        <p>
          Quantum entanglement does not transmit information faster than light.
          The correlated outcomes are revealed only after both measurements are
          compared. In the Z basis, |Φ⁺⟩ gives the same outcome on both qubits.
          In the X and Y bases, it gives opposite outcomes. This is a
          visualization of quantum correlations, not of particles sending
          messages to each other.
        </p>
      </section>

      {/* Reveal */}
      {measurements > 0 && (
        <Reveal
          measurements={measurements}
          correlated={correlated}
          basis={basis}
        />
      )}

      <ConfessionCard confession={confessionFor("entanglement")} />
    </div>
  );
}