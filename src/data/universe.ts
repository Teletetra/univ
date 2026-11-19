export type PlanetConfig = {
  id: string;
  chapter: string;
  name: string;
  subtitle: string;
  description: string;
  /** One personal line, shown in the planet panel under the description. */
  whisper?: string;
  color: string;
  emissive: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitInclination: number;
  href: string;
  achievement?: string;
  /**
   * "science" chapters are the experiments.
   * "story" chapters are the ones that aren't really experiments at all.
   */
  kind?: "science" | "story";
  /** Decorative tilted orbit ring (chapter 06). */
  tilted?: boolean;
};

export const RITU_STAR = {
  name: "Ritu",
  designation: "RITU-001",
  birthday: "19 · NOV",
  subtitle: "Principal Investigator",
} as const;

export const PLANETS: PlanetConfig[] = [
  {
    id: "wave-mechanics",
    chapter: "01",
    name: "Wave Mechanics",
    subtitle: "The Double-Slit Experiment",
    description:
      "The universe has an extraordinary number of possibilities. Somehow, one of my favourite discoveries was getting to know you.",
    whisper:
      "You were the first result that made me stop pretending this was only an experiment.",
    color: "#5b5fc7",
    emissive: "#9485ed",
    size: 0.7,
    orbitRadius: 5.5,
    orbitSpeed: 0.18,
    orbitInclination: 0.1,
    href: "/experiments/double-slit",
    achievement: "OBSERVER EFFECT · FIRST LOOK",
    kind: "science",
  },
  {
    id: "entanglement",
    chapter: "02",
    name: "Entanglement",
    subtitle: "Quantum Correlations",
    description:
      "Some connections are difficult to explain. Not because they aren't real, but because ordinary language sometimes feels too small.",
    whisper:
      "Whatever happens to you, something in me already knows before you say it.",
    color: "#4ec9d6",
    emissive: "#7ee3ee",
    size: 0.6,
    orbitRadius: 7.2,
    orbitSpeed: 0.13,
    orbitInclination: -0.08,
    href: "/experiments/entanglement",
    achievement: " kanishk HAS JOINED",
    kind: "science",
  },
  {
    id: "probability",
    chapter: "03",
    name: "Probability",
    subtitle: "The Probability of You",
    description:
      "If I had to choose what to spend more time discovering, it would still be you.",
    whisper:
      "Of every possible version of my life, I keep choosing the one with you in it.",
    color: "#d6b99a",
    emissive: "#f0d5b6",
    size: 0.75,
    orbitRadius: 9.4,
    orbitSpeed: 0.09,
    orbitInclination: 0.14,
    href: "/experiments/probability",
    achievement: "OBSERVER BIAS · STRONGLY FAVOURABLE",
    kind: "science",
  },
  {
    id: "archive",
    chapter: "04",
    name: "The Archive",
    subtitle: "Observation Archive",
    description:
      "Every little detail, remembered. Some things deserve to be appreciated.",
    whisper:
      "I remember the small things. The pause before you laugh. That's the whole confession.",
    color: "#b56bd1",
    emissive: "#d8a4f0",
    size: 0.65,
    orbitRadius: 11.8,
    orbitSpeed: 0.065,
    orbitInclination: -0.15,
    href: "/archive",
    achievement: "DATA INTEGRITY · PERFECT",
    kind: "science",
  },
  {
    id: "final",
    chapter: "05",
    name: "Final Report",
    subtitle: "An Observation Beyond Measurement",
    description:
      "Not everything beautiful needs an explanation. Some things deserve to be appreciated.",
    whisper: "Everything else here is instrumentation. This is the measurement.",
    color: "#e8ddf8",
    emissive: "#ffffff",
    size: 0.45,
    orbitRadius: 14.2,
    orbitSpeed: 0.045,
    orbitInclination: 0.05,
    href: "/final-report",
    achievement: "MISSION COMPLETE · BEGINNING OF SOMETHING ELSE",
    kind: "science",
  },
  {
    id: "apothecary",
    chapter: "06",
    name: "The Apothecary's Garden",
    subtitle: "Observations on the worlds she inhabits",
    description:
      "Off the main orbit, tilted a little, warm instead of cold. Not an experiment. A story she keeps returning to — and the reason I noticed it.",
    whisper: "You are the only story I want to keep reading.",
    color: "#a8b87a",
    emissive: "#d8e3b0",
    size: 0.5,
    orbitRadius: 16.6,
    orbitSpeed: 0.032,
    orbitInclination: 0.42,
    href: "/experiments/apothecary",
    achievement: "RARE SPECIMEN · HANDLE WITH CARE",
    kind: "story",
    tilted: true,
  },
];

export function planetById(id: string): PlanetConfig | undefined {
  return PLANETS.find((p) => p.id === id);
}
