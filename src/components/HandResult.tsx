import { useGame } from "../stores/useGame";
import { evaluateHand } from "../utils/poker";
import type { PokerHand } from "../types/pokerHand";

const handNames: Record<PokerHand, string> = {
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

export default function HandResult() {
  const hand = useGame((state) => state.hand);
  const lastWinnings = useGame((state) => state.lastWinnings);

  if (hand.length !== 5) {
    return null;
  }

  const result = evaluateHand(hand);

  return (
  <div aria-live="polite">
    <p>Hånd: {handNames[result]}</p>

    {lastWinnings !== null && (
      <p>
        {lastWinnings > 0
          ? `Utbetaling: ${lastWinnings} mynter`
          : "Ingen gevinst denne runden"}
      </p>
    )}
  </div>
);
}