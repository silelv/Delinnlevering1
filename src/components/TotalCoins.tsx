import { usePlayers } from "../stores/usePlayers"; 

export default function TotalCoins() {
    const players = usePlayers((state) => state.players)
    const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
    const selectedPlayer = players.find (
        (player) => player.id === selectedPlayerId
    );

    if (!selectedPlayer) return null;

    return <p>Mynter: {selectedPlayer.coins}</p>

  return (
    <div>
      
    </div>
  )
}
