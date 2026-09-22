import { useRef } from "react";
import { usePlayers } from "../stores/usePlayers";
import { handNames } from "../utils/handNames";
import buttonStyles from "../componentcss/CurrentBet.module.css";
import tableStyles from "../componentcss/PayoutTable.module.css";
import styles from "../componentcss/GameLog.module.css";


export default function GameLog() {
  const logDialog = useRef<HTMLDialogElement>(null);
  const players = usePlayers((state) => state.players);
  const selectedPlayerId = usePlayers((state) => state.selectedPlayerId);

  const selectedPlayer = players.find(
    (player) => player.id === selectedPlayerId,
  );

  const rounds = selectedPlayer?.log ?? [];

  return (
    <section>
      <button
      className={buttonStyles.button}
        type="button"
        onClick={() => logDialog.current?.showModal()}
      disabled={!selectedPlayer}
      >
        Vis logg
      </button>
       <dialog ref={logDialog} 
       className={styles.dialog}
       aria-labelledby="log-title">
      <h2 id="log-title">Rundelogg for {selectedPlayer?.name}</h2>
         {rounds.length === 0 && <p>Ingen ferdige runder ennå.</p>}
 <table className={tableStyles.table}>
  <thead>
    <tr>
      <th scope="col">Hånd</th>
      <th scope="col">Innsats</th>
      <th scope="col">Utbetaling</th>
      <th scope="col">Resultat</th>
    </tr>
  </thead>

  <tbody>
    {rounds.map((round) => (
      <tr key={round.id}>
        <th scope="row">{handNames[round.hand]}</th>
        <td>{round.bet}</td>
        <td>{round.winnings}</td>
        <td>{round.winnings - round.bet}</td>
      </tr>
    ))}
  </tbody>
</table>
  <button
  className={buttonStyles.button}
        type="button"
        onClick={() => logDialog.current?.close()}
      >
        Lukk
      </button>
    </dialog>
    </section>
  );
}
