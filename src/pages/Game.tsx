import Card from "../components/Card"
import { usePlayers } from "../stores/usePlayers"
import TotalCoins from "../components/TotalCoins";

export default function Game() {
    const players = usePlayers((state) => state.players);
    const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
    const selectedPlayer = players.find(
        (player) => player.id === selectedPlayerId);
    

  return (
    <main>
   <h2>Spill</h2>
   {selectedPlayer ? (
  <p>Spiller: {selectedPlayer.name}</p>
) : (
  <p>Velg en spiller på spillersiden for å begynne.</p>
)}
   <Card card={{ suit: "spades", value: 1 }} faceDown />
   <TotalCoins />
   </main>
  )
}
