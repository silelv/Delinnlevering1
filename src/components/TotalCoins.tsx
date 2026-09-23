import { usePlayers } from "../stores/usePlayers";

export default function TotalCoins() {
  const players = usePlayers((state) => state.players);
  const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
  const selectedPlayer = players.find(
    (player) => player.id === selectedPlayerId,
  );

  if (!selectedPlayer) return null;

  return <p>Mynter: {selectedPlayer.coins}</p>;

 
}
// Trenger ingenting inn. Viser hvor mange mynter den valgte spilleren har.
// Gir tilbake myntvisningen, eller ingenting hvis ingen spiller er valgt.