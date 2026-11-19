"use client";

import { useMemo, useState } from "react";
import { Atom, Info, RotateCcw, Sparkles } from "lucide-react";

import InterferenceCanvas from "./InterferenceCanvas";
import Slider from "./Slider";
import ConfessionCard from "@/components/ui/ConfessionCard";
import { confessionFor } from "@/data/confessions";

import {
  generateIntensityData,
  type DoubleSlitParameters,
} from "@/physics/double-slit";

const INITIAL: DoubleSlitParameters = {
  wavelengthNm: 550,
  slitSeparationMm: 0.3,
  slitWidthMm: 0.06,
  screenDistanceM: 1.5,
  mode: "double",
};

export default function DoubleSlitExperiment() {
  const [params, setParams] = useState<DoubleSlitParameters>(INITIAL);
  const [hasInteracted, setHasInteracted] = useState(false);

  const update = <K extends keyof DoubleSlitParameters>(
    key: K,
    value: DoubleSlitParameters[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    setHasInteracted(true);
  };

  const reset = () => {
    setParams(INITIAL);
    setHasInteracted(false);
  };

  const data = useMemo(() => generateIntensityData(params), [params]);

  const centralIntensity = useMemo(
    () => data[Math.floor(data.length / 2)]?.intensity ?? 0,
    [data]
  );

  const fringeSpacingMm = useMemo(() => {
    const lambdaM = params.wavelengthNm * 1e-9;
    const dM = params.slitSeparationMm * 1e-3;
    const LM = params.screenDistanceM;
    return (lambdaM * LM) / dM * 1000;
  }, [params]);

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#a99aff]">
          <Atom size={15} />
          EXPERIMENT 01 / WAVE MECHANICS
        </div>

        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
          The Double-Slit Experiment
        </h1>

        <p className="max-w-2xl text-sm leading-7 text-[#929fbd]">
          Investigate the interference pattern produced by coherent light
          passing through one or two slits. Adjust the experimental parameters
          and observe how the distribution changes.
        </p>
      </section>

      {/* Plot + controls */}
      <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="panel p-4 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-medium">Observation screen</h2>
              <p className="mt-1 text-xs text-[#929fbd]">
                Far-field intensity profile · Fraunhofer approximation
              </p>
            </div>

            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-lg border border-[#26324b] px-3 py-2 text-xs text-[#c1b4ff] transition hover:bg-[#18223a]"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>

          <div className="mt-4">
            <InterferenceCanvas params={params} />
          </div>

          {/* Stat row */}
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            <Stat label="Central intensity" value={(centralIntensity * 100).toFixed(1) + "%"} />
            <Stat label="Fringe spacing" value={fringeSpacingMm.toFixed(2) + " mm"} />
            <Stat label="Mode" value={params.mode === "double" ? "Two slits" : "One slit"} />
          </div>
        </div>

        {/* Controls */}
        <div className="panel space-y-6 p-4 md:p-6">
          <div>
            <p className="lab-label mb-3">Configuration</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => update("mode", "single")}
                className={`rounded-lg border px-3 py-2 text-sm transition ${
                  params.mode === "single"
                    ? "border-[#7469d8] bg-[#292443] text-[#d4c9ff]"
                    : "border-[#26324b] text-[#929fbd] hover:bg-[#18223a]"
                }`}
              >
                Single slit
              </button>
              <button
                onClick={() => update("mode", "double")}
                className={`rounded-lg border px-3 py-2 text-sm transition ${
                  params.mode === "double"
                    ? "border-[#7469d8] bg-[#292443] text-[#d4c9ff]"
                    : "border-[#26324b] text-[#929fbd] hover:bg-[#18223a]"
                }`}
              >
                Double slit
              </button>
            </div>
          </div>

          <Slider
            label="Wavelength"
            value={params.wavelengthNm}
            min={400}
            max={700}
            step={5}
            unit="nm"
            onChange={(v) => update("wavelengthNm", v)}
          />

          <Slider
            label="Slit separation"
            value={params.slitSeparationMm}
            min={0.1}
            max={0.6}
            step={0.01}
            unit="mm"
            onChange={(v) => update("slitSeparationMm", v)}
          />

          <Slider
            label="Slit width"
            value={params.slitWidthMm}
            min={0.02}
            max={0.15}
            step={0.005}
            unit="mm"
            onChange={(v) => update("slitWidthMm", v)}
          />

          <Slider
            label="Screen distance"
            value={params.screenDistanceM}
            min={0.5}
            max={3.0}
            step={0.05}
            unit="m"
            onChange={(v) => update("screenDistanceM", v)}
          />
        </div>
      </section>

      {/* Scientific note */}
      <section className="panel flex gap-3 p-4 text-xs leading-6 text-[#929fbd]">
        <Info size={16} className="mt-0.5 shrink-0 text-[#b8a4ff]" />
        <p>
          This is a normalized far-field model using the Fraunhofer
          approximation for two identical coherent slits. The curve represents
          expected relative intensity, not a literal measurement of a single
          particle. Wavelength colours are illustrative.
        </p>
      </section>

      {/* Reveal */}
      {hasInteracted && (
        <section className="panel-raised border-[#3b3470] p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs tracking-widest text-[#b8a4ff]">
            <Sparkles size={14} />
            OBSERVATION LOG · CHAPTER 01
          </div>
          <p className="mt-4 max-w-3xl font-hand text-xl leading-9 text-[#e8ddf8]">
            “The universe has an extraordinary number of possibilities.
            Somehow, one of my favourite discoveries was getting to know you.”
          </p>
          {params.mode === "single" && (
            <p className="mt-4 text-xs text-[#929fbd]">
              NOTE: Even one slit produces a pattern. But two are more
              interesting. Much like conversations with you.
            </p>
          )}
        </section>
      )}

      <ConfessionCard confession={confessionFor("wave-mechanics")} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#0b1224] p-3">
      <p className="text-xs text-[#929fbd]">{label}</p>
      <p className="mt-1 font-mono text-sm text-[#e8ddf8]">{value}</p>
    </div>
  );
}