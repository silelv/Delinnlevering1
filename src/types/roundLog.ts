import type { PokerHand } from "./pokerHand";

export type RoundLog = {
  id: string;
  hand: PokerHand;
  bet: number;
  winnings: number;
};

