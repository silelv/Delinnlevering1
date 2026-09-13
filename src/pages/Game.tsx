import Card from "../components/Card"
import { usePlayers } from "../stores/usePlayers"
import TotalCoins from "../components/TotalCoins";
import CurrentBet from "../components/CurrentBet";
import styles from "../componentcss/Game.module.css";

export default function Game() {
    const players = usePlayers((state) => state.players);
    const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
    const selectedPlayer = players.find(
        (player) => player.id === selectedPlayerId);
    

  return (
    <main className={styles.game}>
   <h2 className={styles.title}>Spill</h2>
   <div>
   {selectedPlayer ? (
  <p>Spiller: {selectedPlayer.name}</p>
) : (
  <p>Velg en spiller på spillersiden for å begynne.</p>
)}
   <Card card={{ suit: "spades", value: 1 }} faceDown />
   <TotalCoins />
   </div>

    <div className={styles.cards}>
      <Card card={{ suit: "spades", value: 1 }} faceDown />
    </div>


    <div className={styles.controls}>
      <CurrentBet />
    </div>
   </main>
  )
}
