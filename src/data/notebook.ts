export type NotebookEntry = {
  id: string;
  number: string;
  date: string;
  title: string;
  body: string;
  sketch?: "wave" | "orbit" | "entangle" | "star";
};

export const NOTEBOOK: NotebookEntry[] = [
  {
    id: "n-001",
    number: "001",
    date: "—",
    title: "First observation",
    body:
      "Subject appears to enjoy proving other people wrong in the gentlest possible way. Noted for further study.",
    sketch: "orbit",
  },
  {
    id: "n-002",
    number: "002",
    date: "—",
    title: "On curiosity",
    body:
      "She asked a question today that I didn't know how to answer. That's the highest compliment I can pay a question.",
    sketch: "wave",
  },
  {
    id: "n-003",
    number: "003",
    date: "—",
    title: "On humour",
    body:
      "The jokes arrive without warning. They're always worth the wait.",
  },
  {
    id: "n-004",
    number: "004",
    date: "—",
    title: "On worlds",
    body:
      "She treats stories and games like worlds worth exploring. I think that's how she treats people too.",
    sketch: "star",
  },
  {
    id: "n-005",
    number: "005",
    date: "—",
    title: "On entanglement",
    body:
      "There is a kind of correlation that shows up in the data but has no mechanism I can point to. I've stopped trying to explain it.",
    sketch: "entangle",
  },
  {
    id: "n-006",
    number: "006",
    date: "—",
    title: "On 19 November",
    body:
      "Some dates are worth marking. This one deserves a constellation.",
    sketch: "star",
  },
];