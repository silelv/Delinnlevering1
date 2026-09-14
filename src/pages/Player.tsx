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
  const phase = useGame((state) => state.phase);
  const roundIsActive = phase === "holding";

  function registerPlayer(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();

    if (name === "") return;

    addPlayer(name);
  }

  function choosePlayer(id: string) {

    if (roundIsActive) return;

  selectPlayer(id);
  setBet(1);
}

  return (
    <main className={styles.page}>
      <h2>Velg spiller</h2>
      {roundIsActive && (
  <p>Fullfør runden på spillsiden før du bytter eller sletter spillere.</p>
)}
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
      disabled={roundIsActive || selectedPlayerId === player.id}>
        {selectedPlayerId === player.id ? "Valgt" : "Velg spiller"}
      </button>
      <button
      className={styles.deleteButton}
      type="button"
      onClick={() => removePlayer(player.id)}
      disabled={roundIsActive}
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

