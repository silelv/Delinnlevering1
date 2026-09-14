import Card from "../components/Card"
import { usePlayers } from "../stores/usePlayers"
import TotalCoins from "../components/TotalCoins";
import CurrentBet from "../components/CurrentBet";
import styles from "../componentcss/Game.module.css";
import { useGame } from "../stores/useGame";

export default function Game() {
    const players = usePlayers((state) => state.players);
    const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
    const selectedPlayer = players.find(
        (player) => player.id === selectedPlayerId);
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
      <span>
        {heldCards.includes(index) ? "Beholdes" : "Behold"}
      </span>
    </button>
  ))}
</div>


    <div className={styles.controls}>
      <CurrentBet />
      <button
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
  type="button"
  onClick={drawCards}
  disabled={phase !== "holding"}
>
  Bytt kort
</button>
    </div>
   </main>
  )
}
