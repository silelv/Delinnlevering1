import { useGame } from "../stores/useGame";
import { usePlayers } from "../stores/usePlayers";
import styles from "../componentcss/CurrentBet.module.css";

export default function CurrentBet() {
  const bet = useGame((state) => state.bet);
  const setBet = useGame((state) => state.setBet);
  const players = usePlayers((state) => state.players);
  const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);

  const selectedPlayer = players.find(
    (player) => player.id === selectedPlayerId,
  );

  return (
    <div className={styles.bet}>
      <p className={styles.amount}>
        Innsats: {bet} mynt{bet === 1 ? "" : "er"}
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          type="button"
          onClick={() => setBet(bet - 1)}
          disabled={bet <= 1}
        >
          Reduser Innsats
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() => setBet(bet + 1)}
          disabled={!selectedPlayer || bet >= selectedPlayer.coins}
        >
          Øk innsats
        </button>
      </div>
    </div>
  );
}
