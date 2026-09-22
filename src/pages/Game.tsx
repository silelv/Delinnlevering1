import Card from "../components/Card";
import { usePlayers } from "../stores/usePlayers";
import TotalCoins from "../components/TotalCoins";
import CurrentBet from "../components/CurrentBet";
import styles from "../componentcss/Game.module.css";
import { useGame } from "../stores/useGame";
import HandResult from "../components/HandResult";
import buttonStyles from "../componentcss/CurrentBet.module.css";
import GameLog from "../components/GameLog";

export default function Game() {
  const players = usePlayers((state) => state.players);
  const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
  const selectedPlayer = players.find(
    (player) => player.id === selectedPlayerId,
  );
  const hand = useGame((state) => state.hand);
  const bet = useGame((state) => state.bet);
  const phase = useGame((state) => state.phase);
  const dealCards = useGame((state) => state.dealCards);
  const heldCards = useGame((state) => state.heldCards);
  const toggleHold = useGame((state) => state.toggleHold);
  const drawCards = useGame((state) => state.drawCards);

  return (
    <main className={styles.game}>
      <h2 className={styles.title}>Spill</h2>
      <div>
        {selectedPlayer ? (
          <p>Spiller: {selectedPlayer.name}</p>
        ) : (
          <p>Velg en spiller på spillersiden for å begynne.</p>
        )}

        <TotalCoins />
      </div>

      <div className={styles.cards}>
        {selectedPlayer &&
          hand.length === 0 &&
          [0, 1, 2, 3, 4].map((index) => (
            <Card key={index} card={{ suit: "hearts", value: 1 }} faceDown />
          ))}
        {hand.map((card, index) => (
          <button
            key={`${card.suit}-${card.value}`}
            className={`${styles.cardButton} ${
              heldCards.includes(index) ? styles.held : ""
            }`}
            type="button"
            onClick={() => toggleHold(index)}
            disabled={phase !== "holding"}
            aria-pressed={heldCards.includes(index)}
            aria-label={`${card.suit} ${card.value}, behold kort`}
          >
            <Card card={card} />
            {heldCards.includes(index) ? (
              <span>Beholdes</span>
            ) : (
              phase === "holding" && <span>Behold</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <CurrentBet />
        <div className={buttonStyles.buttons}>
          <button
            className={buttonStyles.button}
            type="button"
            onClick={dealCards}
            disabled={
              !selectedPlayer ||
              phase === "holding" ||
              bet > selectedPlayer.coins
            }
          >
            Del ut
          </button>
          <button
            className={buttonStyles.button}
            type="button"
            onClick={drawCards}
            disabled={phase !== "holding"}
          >
            Bytt kort
          </button>
        </div>
      </div>
      <HandResult />
      <GameLog />
    </main>
  );
}
