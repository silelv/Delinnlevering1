import { useGame } from "../stores/useGame";
import { evaluateHand } from "../utils/poker";
import { handNames } from "../utils/handNames";

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

// Trenger ingenting inn. Sjekker hvilken pokerhånd spilleren har og viser
// eventuell utbetaling. Gir tilbake visningen, eller ingenting hvis hånda ikke har fem kort.
