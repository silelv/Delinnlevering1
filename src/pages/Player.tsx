import { usePlayers } from "../stores/usePlayers"
import { useGame } from "../stores/useGame";
import styles from "../componentcss/Player.module.css";

export default function Player() {

  const addPlayer = usePlayers((state) => state.addPlayer);
  const players = usePlayers((state) => state.players);
  const selectPlayer = usePlayers((state) => state.selectPlayer);
  const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
  const removePlayer = usePlayers((state) => state.removePlayer);
  const setBet = useGame((state) => state.setBet)

  function registerPlayer(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();

    if (name === "") return;

    addPlayer(name);
  }

  function choosePlayer(id: string) {
  selectPlayer(id);
  setBet(1);
}

  return (
    <main className={styles.page}>
      <h2>Velg spiller</h2>
      <form className={styles.form} action={registerPlayer}>
        <label htmlFor="playerName">Spillernavn</label>
        <input
          className={styles.input}
          id="playerName"
          name="name"
          type="text"
          required
        />
        <button className={styles.button}
        type="submit">Opprett spiller</button>
      </form>
      <ul className={styles.list}>
  {players.map((player) => (
    <li className={styles.player} key={player.id}>
      {player.name} – {player.coins} mynter
    <div className={styles.actions}>
      <button 
      className={styles.button}
      type="button" 
      onClick={() => choosePlayer(player.id)}
      disabled={selectedPlayerId === player.id}>
        {selectedPlayerId === player.id ? "Valgt" : "Velg spiller"}
      </button>
      <button
      className={styles.deleteButton}
      type="button"
      onClick={() => removePlayer(player.id)}
>
  Slett spiller
</button>
</div>
    </li>
  ))}
</ul>
  </main>
  )
  }

