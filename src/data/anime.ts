export type AnimeStar = {
  id: string;
  label: string;
  show: string;
  note: string;
  /** 0..1 in constellation space */
  x: number;
  y: number;
  major?: boolean;
};

export type Herb = {
  id: string;
  name: string;
  latin: string;
  /** Drawer label, e.g. "I" */
  index: string;
  accent: string;
  note: string;
};

/**
 * Chapter 06 · The Apothecary's Garden
 *
 * The star map is "the narrative worlds she lives in". The brightest star
 * is The Apothecary Diaries. The rest are placeholders — swap in whatever
 * she actually watches, or trim the list. Keep the coordinates spread out.
 */
export const ANIME_STARS: AnimeStar[] = [
  {
    id: "apothecary-diaries",
    label: "Maomao",
    show: "The Apothecary Diaries",
    note: "The one you love enough that I started watching it too. A girl who notices everything and says almost none of it. I know why it's your favourite.",
    x: 0.5,
    y: 0.3,
    major: true,
  },
  {
    id: "quiet-worlds",
    label: "Slow worlds",
    show: "The ones where nothing explodes",
    note: "You don't watch things for the plot twists. You watch them for the quiet parts — the tea, the corridor conversation, the look someone gives when they decide to be kind.",
    x: 0.22,
    y: 0.62,
  },
  {
    id: "puzzles",
    label: "Puzzle box",
    show: "Stories that out-think you",
    note: "A mystery you can solve before the characters do is a wasted evening. You want the show to be at least as clever as you are. It rarely is.",
    x: 0.74,
    y: 0.55,
  },
  {
    id: "the-laugh",
    label: "The dry one",
    show: "Deadpan, unimpressed, perfect",
    note: "The face a character makes when the world is being stupid. You have that face. You've used it on me. I deserved it, probably.",
    x: 0.4,
    y: 0.76,
  },
  {
    id: "someone-like-you",
    label: "Her",
    show: "The character who is a little too familiar",
    note: "You always find the one character who keeps their feelings behind their teeth and does the brave thing anyway. You always pretend you don't relate.",
    x: 0.64,
    y: 0.22,
  },
];

export const HERBS: Herb[] = [
  {
    id: "gardenia",
    name: "Gardenia",
    latin: "Gardenia jasminoides",
    index: "I",
    accent: "#e8ddf8",
    note: "The calm face that hides a bright, dangerous mind. You do this too. Calm on the outside, always three steps ahead. I've learned to check what you're smiling about.",
  },
  {
    id: "poison",
    name: "Poison",
    latin: "Toxicodendron vernix",
    index: "II",
    accent: "#d88a9a",
    note: "You notice what's really going on in a room before anyone else does. I've been on the receiving end of that. It's terrifying and I love it.",
  },
  {
    id: "sake",
    name: "Sake",
    latin: "Oryza sativa · fermented",
    index: "III",
    accent: "#d6b99a",
    note: "The humour. The flat, unimpressed expression in the middle of an absurd situation. You have the same face when someone says something stupid. It's my favourite face.",
  },
  {
    id: "cures",
    name: "Cures",
    latin: "Panax ginseng",
    index: "IV",
    accent: "#9fd6b4",
    note: "The quiet endings where the character you've been watching the whole time is suddenly tender. I have my own version of this. It's this project.",
  },
  {
    id: "ginger",
    name: "Ginger",
    latin: "Zingiber officinale",
    index: "V",
    accent: "#e0b48a",
    note: "Warmth that arrives disguised as sharpness. You'd rather be honest than nice, and somehow that's the kindest thing about you.",
  },
  {
    id: "salt",
    name: "Salt",
    latin: "Natrium chloridum",
    index: "VI",
    accent: "#c8d0e0",
    note: "For the ordinary days. Groceries, deadlines, a bad week. The unglamorous part is where I decided I wanted all of it, not just the highlight reel.",
  },
];

/** The handwritten side-note tucked into the cabinet. */
export const APOTHECARY_NOTE = {
  heading: "On why she loves it",
  lines: [
    "Because the girl nobody takes seriously is the only one who is actually paying attention.",
    "Because being underestimated is a kind of armour, and she wears it better than anyone.",
    "Because the story is about someone who notices everything and is rarely thanked for it — and I wanted to be the one who notices her noticing.",
  ],
  signature: "— written by the one who keeps the drawers",
};

/** The prescription slip at the end of the chapter. */
export const PRESCRIPTION = {
  number: "RX-1901",
  date: "19 · 11",
  lines: [
    "One additional season, watched together.",
    "Dispense: whenever she wants.",
    "Refills: unlimited.",
  ],
  advice: "Take with tea. Side effects include talking over the ending and one more episode becoming four.",
  stamp: "APPROVED · ritu",
  signoff: " · Dept. of Hopeless Observation",
};
