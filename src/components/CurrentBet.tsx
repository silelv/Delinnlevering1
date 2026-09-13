import { useGame } from "../stores/useGame";
import { usePlayers } from "../stores/usePlayers";

export default function CurrentBet() {
    const bet = useGame((state) => state.bet);
    const setBet = useGame((state) => state.setBet);
    const players = usePlayers((state) => state.players);
    const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);

    const selectedPlayer = players.find(
        (player) => player.id === selectedPlayerId
    );

  return (
    <div>
    <p>Innsats: {bet} mynt{bet === 1 ? "" : "er"}</p>
    <button
        type="button"
        onClick={() => setBet(bet - 1)}
        disabled={bet <= 1}>Reduser Innsats
        </button>
        <button
      type="button"
      onClick={() => setBet(bet + 1)}
      disabled={!selectedPlayer || bet >= selectedPlayer.coins}
    >
      Øk innsats
    </button>
        </div>
    )
}
