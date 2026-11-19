export type Confession = {
  /** Matches the chapter slug (also the planet id in universe.ts). */
  id: string;
  chapter: string;
  title: string;
  body: string[];
  signoff: string;
};

/**
 * One personal note per chapter. These are the "confession" beats —
 * the point where the experiment stops being about physics and starts
 * being about her.
 *
 * EDIT THESE before 19 Nov. Keep them in your own voice; the physics
 * metaphor is just the door, the feeling is the room.
 */
export const CONFESSIONS: Record<string, Confession> = {
  "wave-mechanics": {
    id: "wave-mechanics",
    chapter: "01",
    title: "The observer effect, personal edition",
    body: [
      "I built an experiment to look at something beautiful, and the moment I looked closely it changed. Not the experiment. Me.",
      "I can measure where you are, or what you're doing, or how your day went — but never all of it at once. So I keep looking. That's the whole method, honestly. That's the whole project.",
    ],
    signoff: "— your observer",
  },
  entanglement: {
    id: "entanglement",
    chapter: "02",
    title: "Correlated, at any distance",
    body: [
      "I don't know how to explain the part where your bad day lands in my chest before you tell me about it.",
      "Physics has a boring name for it. I have a better one: you.",
      "Something happens to you and something answers in me. No signal, no distance. Just the arrangement we were made in.",
    ],
    signoff: "— qubit B",
  },
  probability: {
    id: "probability",
    chapter: "03",
    title: "The most biased experiment I've ever run",
    body: [
      "Every version of my future is a superposition until I look at it. And in every one I actually look at, you're there.",
      "Statistically, I should be more careful. I'm not going to be. I'm keeping the data.",
    ],
    signoff: "— the measurement problem",
  },
  archive: {
    id: "archive",
    chapter: "04",
    title: "Not memories. Evidence.",
    body: [
      "I started this archive to remember the big things. It filled up with small ones instead — the way you say a word twice when you're excited, the pause before you laugh at your own joke.",
      "Here's the confession: I'm not archiving memories. I'm collecting proof that this happened. That you happened. To me.",
    ],
    signoff: "— the archivist",
  },
  final: {
    id: "final",
    chapter: "05",
    title: "What the report was really about",
    body: [
      "I've been writing this for months and every draft ends the same way, so I'll stop burying it in the methodology.",
      "I like you. Not as a subject, not as a hypothesis, not as a beautiful thing to observe — as the person I want in the room when nothing interesting is happening.",
      "Everything else here is instrumentation. This is the measurement.",
    ],
    signoff: "—  kanishk",
  },
  apothecary: {
    id: "apothecary",
    chapter: "06",
    title: "Diagnosis: no known cure",
    body: [
      "Maomao would take one look at me and write the diagnosis down without asking. Lovesick. Chronic. Do not treat.",
      "I've watched you get excited about a story and forget the whole world for a minute. That's the thing I'm after — I want to be the story you get excited about like that.",
      "That's it. That's the confession.",
    ],
    signoff: "— your apothecary",
  },
};

export function confessionFor(id: keyof typeof CONFESSIONS): Confession {
  return CONFESSIONS[id];
}
