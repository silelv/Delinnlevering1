import { usePlayers } from "../stores/usePlayers";
import { useGame } from "../stores/useGame";
import styles from "../componentcss/Player.module.css";
import buttonStyles from "../componentcss/CurrentBet.module.css";

export default function Player() {
  const addPlayer = usePlayers((state) => state.addPlayer);
  const players = usePlayers((state) => state.players);
  const selectPlayer = usePlayers((state) => state.selectPlayer);
  const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);
  const removePlayer = usePlayers((state) => state.removePlayer);
  const phase = useGame((state) => state.phase);
  const roundIsActive = phase === "holding";
  const resetGame = useGame((state) => state.resetGame);

  function registerPlayer(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();

    if (name === "") return;

    addPlayer(name);
  }

  // Tar inn skjemaet og fjerner mellomrom før og etter navnet.
  // Oppretter spilleren hvis navnet ikke er tomt. Gir ingen verdi tilbake.

  function choosePlayer(id: string) {
    if (roundIsActive) return;

    selectPlayer(id);
    resetGame();
  }

  // Tar inn spillerens id, velger spilleren og nullstiller spillet.
  // Stopper hvis en runde pågår. Gir ingen verdi tilbake.

  function deletePlayer(id: string) {
    if (roundIsActive) return;

    if (id === selectedPlayerId) {
      resetGame();
    }

    removePlayer(id);
  }

  // Tar inn spillerens id og sletter spilleren hvis ingen runde pågår.
  // Nullstiller også spillet hvis spilleren var valgt. Gir ingen verdi tilbake.

  return (
    <main className={styles.page}>
      <h2>Velg spiller</h2>
      {roundIsActive && (
        <p>
          Fullfør runden på spillsiden før du bytter eller sletter spillere.
        </p>
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
        <button className={buttonStyles.button} type="submit">
          Opprett spiller
        </button>
      </form>
      <ul className={styles.list}>
        {players.map((player) => (
          <li className={styles.player} key={player.id}>
            {player.name} – {player.coins} mynter
            <div className={styles.actions}>
              <button
                className={buttonStyles.button}
                type="button"
                onClick={() => choosePlayer(player.id)}
                disabled={roundIsActive || selectedPlayerId === player.id}
              >
                {selectedPlayerId === player.id ? "Valgt" : "Velg spiller"}
              </button>
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => deletePlayer(player.id)}
                disabled={roundIsActive}
              >
                Slett spiller
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

// Trenger ingenting inn. Gir tilbake spillersiden med listen over spillere
// og mulighet til å opprette, velge og slette spillere.