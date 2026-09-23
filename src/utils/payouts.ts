import type { PokerHand } from "../types/pokerHand";
import type { PlayingCard } from "../types/playingCard";
import { evaluateHand } from "./poker";

export const payouts: Record<PokerHand, number> = {
  "royal-flush": 250,
  "straight-flush": 50,
  "four-of-a-kind": 25,
  "full-house": 9,
  flush: 6,
  straight: 4,
  "three-of-a-kind": 3,
  "two-pair": 2,
  "one-pair": 1,
  "high-card": 0,
};

export function calculateWinnings(hand: PlayingCard[], bet: number): number {
  if (!Number.isInteger(bet) || bet < 1) {
    throw new Error("Innsatsen må være minst 1 kr");
  }

  const result = evaluateHand(hand);
  const multiplier = payouts[result];
  return bet * multiplier;
}
// Tar inn hånda og innsatsen. Ganger innsatsen med det hånda betaler.
// Gir tilbake hvor mange mynter spilleren skal få.
