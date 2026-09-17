import type { PokerHand } from "../types/pokerHand";

export const handNames: Record<PokerHand, string> = {
  "royal-flush": "Royal flush",
  "straight-flush": "Straight flush",
  "four-of-a-kind": "Fire like",
  "full-house": "Fullt hus",
  flush: "Flush",
  straight: "Straight",
  "three-of-a-kind": "Tre like",
  "two-pair": "To par",
  "one-pair": "Ett par",
  "high-card": "Høyt kort",
};