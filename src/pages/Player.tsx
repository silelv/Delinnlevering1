import { usePlayers } from "../stores/usePlayers"

export default function Player() {

  const addPlayer = usePlayers((state) => state.addPlayer);
  const players = usePlayers((state) => state.players);
  
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
    </li>
  ))}
</ul>
  </>
  )
  }

