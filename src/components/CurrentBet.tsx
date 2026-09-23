import { useGame } from "../stores/useGame";
import { usePlayers } from "../stores/usePlayers";
import styles from "../componentcss/CurrentBet.module.css";

export default function CurrentBet() {
  const bet = useGame((state) => state.bet);
  const setBet = useGame((state) => state.setBet);
  const players = usePlayers((state) => state.players);
  const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
  const phase = useGame((state) => state.phase);
  const selectedPlayer = players.find(
    (player) => player.id === selectedPlayerId,
  );

  function decreaseBet() {
    if (!selectedPlayer || selectedPlayer.coins < 1) {
      return;
    }

    let newBet = bet - 1;

    if (newBet > selectedPlayer.coins) {
      newBet = selectedPlayer.coins;
    }

    setBet(newBet);
  }

  // Trenger ingenting inn. Senker innsatsen med 1, eller til antall mynter
  // spilleren har hvis det er lavere. Gir ingen verdi tilbake.

  return (
    <div className={styles.bet}>
      <p className={styles.amount}>
        Innsats: {bet} mynt{bet === 1 ? "" : "er"}
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          type="button"
          onClick={decreaseBet}
          disabled={
            !selectedPlayer ||
            phase === "holding" ||
            bet <= 1 ||
            selectedPlayer.coins < 1
          }
        >
          Reduser Innsats
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() => setBet(bet + 1)}
          disabled={
            !selectedPlayer ||
            phase === "holding" ||
            bet >= selectedPlayer.coins
          }
        >
          Øk innsats
        </button>
      </div>
    </div>
  );
}

// Trenger ingenting inn. Henter innsatsen og valgt spiller fra storene.
// Gir tilbake visningen av innsatsen og knappene for å endre den.
