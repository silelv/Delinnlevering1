import { payouts } from "../utils/payouts";
import { handNames } from "../utils/handNames";
import type { PokerHand } from "../types/pokerHand";
import styles from "../componentcss/PayoutTable.module.css"

export default function PayoutTable() {
  const hands = Object.keys(payouts) as PokerHand[];

  return (
    <table className={styles.table}>
      <caption>Utbetaling per mynt i innsats</caption>

      <thead>
        <tr>
          <th scope="col">Hånd</th>
          <th scope="col">Utbetaling</th>
        </tr>
      </thead>

      <tbody>
        {hands.map((hand) => (
          <tr key={hand}>
            <th scope="row">{handNames[hand]}</th>
            <td>{payouts[hand]} × innsatsen</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Trenger ingenting inn. Gir tilbake en tabell som viser
// hvor mange ganger innsatsen hver pokerhånd betaler.