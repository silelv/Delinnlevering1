import { usePlayers } from "../stores/usePlayers"

export default function Player() {

  const addPlayer = usePlayers((state) => state.addPlayer);
  const players = usePlayers((state) => state.players);
  const selectPlayer = usePlayers((state) => state.selectPlayer);
  const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
  const removePlayer = usePlayers((state) => state.removePlayer);

  function registerPlayer(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();

    if (name === "") return;

    addPlayer(name);
  }

  return (
    <>
      <h2>Velg spiller</h2>
      <form action={registerPlayer}>
        <label htmlFor="playerName">Spillernavn</label>
        <input
          id="playerName"
          name="name"
          type="text"
          required
        />
        <button type="submit">Opprett spiller</button>
      </form>
      <ul>
  {players.map((player) => (
    <li key={player.id}>
      {player.name} – {player.coins} mynter

      <button type="button" 
      onClick={() => selectPlayer(player.id)}
      disabled={selectedPlayerId === player.id}>
        {selectedPlayerId === player.id ? "Valgt" : "Velg spiller"}
      </button>
      <button
  type="button"
  onClick={() => removePlayer(player.id)}
>
  Slett spiller
</button>
    </li>
  ))}
</ul>
  </>
  )
  }

