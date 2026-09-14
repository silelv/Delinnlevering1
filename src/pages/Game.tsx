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
  {hand.map((card) => (
    <Card
      key={`${card.suit}-${card.value}`}
      card={card}
    />
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
    </div>
   </main>
  )
}
