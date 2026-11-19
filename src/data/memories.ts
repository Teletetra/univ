export type Memory = {
  id: string;
  label: string;
  date: string;
  message: string;
  x: number;      // 0..1 in constellation space
  y: number;
  major?: boolean;
  category: "origin" | "moment" | "future" | "anchor";
};

export type ConstellationLink = {
  from: string;
  to: string;
};

/**
 * Edit these before Ritu opens the archive.
 * Keep `x` and `y` between 0 and 1. The layout reads best if you
 * keep the major star (birthday) somewhere in the middle-upper region.
 */
export const MEMORIES: Memory[] = [
  {
    id: "birthday",
    label: "19 Nov",
    date: "19 · 11",
    message:
      "The day the universe decided it needed one more brilliant point of light. Happy birthday, Ritu.",
    x: 0.5,
    y: 0.32,
    major: true,
    category: "anchor",
  },
  {
    id: "first",
    label: "First meeting",
    date: "—",
    message:
      "A small moment that turned out to matter more than either of us realised.",
    x: 0.22,
    y: 0.58,
    category: "origin",
  },
  {
    id: "talk",
    label: "That conversation",
    date: "—",
    message:
      "The one that went longer than it should have. I still think about it.",
    x: 0.68,
    y: 0.5,
    category: "moment",
  },
  {
    id: "joke",
    label: "The joke",
    date: "—",
    message:
      "You laughed. I decided you were dangerous.",
    x: 0.36,
    y: 0.76,
    category: "moment",
  },
  {
    id: "iit",
    label: "IIT Delhi",
    date: "—",
    message:
      "Engineering Physics. The place that built the mind I'm grateful to know.",
    x: 0.18,
    y: 0.3,
    category: "origin",
  },
  {
    id: "games",
    label: "Side quest",
    date: "—",
    message:
      "Some conversation about a game or an anime that made the day better. You make ordinary things feel like worlds.",
    x: 0.82,
    y: 0.68,
    category: "moment",
  },
  {
    id: "future",
    label: "Future",
    date: "—",
    message:
      "Something to look forward to. I have a few ideas.",
    x: 0.62,
    y: 0.82,
    category: "future",
  },
  {
    id: "hidden",
    label: "?",
    date: "—",
    message:
      "You found the hidden star. Of course you did.",
    x: 0.84,
    y: 0.28,
    category: "anchor",
  },
];

export const LINKS: ConstellationLink[] = [
  { from: "birthday", to: "first" },
  { from: "birthday", to: "talk" },
  { from: "birthday", to: "iit" },
  { from: "first", to: "joke" },
  { from: "talk", to: "games" },
  { from: "joke", to: "future" },
  { from: "games", to: "future" },
  { from: "talk", to: "birthday" },
  { from: "iit", to: "first" },
];