import PayoutTable from "../components/PayoutTable";


export default function Rules() {
  return (
    <main>
      <h2>Spilleregler</h2>
      <section>
        <h3>Slik spiller du</h3>
        <ol>
          <li>
            Velg en spiller eller opprett en ny. Nye spillere starter
            med 100 mynter.
          </li>
          <li>
            Velg innsats. Du må satse minst 1 mynt og kan ikke satse
            mer enn du har.
          </li>
          <li>
            Trykk «Del ut». Innsatsen trekkes, og du får fem kort fra
            en ny, stokket kortstokk med 52 kort.
          </li>
          <li>
            Trykk på kortene du vil beholde. Du kan ombestemme deg
            frem til du bekrefter kortbyttet.
          </li>
          <li>
            Trykk «Bytt kort». Kortene som ikke beholdes, erstattes
            fra resten av kortstokken. Du får ett kortbytte per runde.
          </li>
          <li>
            Den endelige hånden avgjør utbetalingen, som legges
            til myntsaldoen din.
          </li>
        </ol>
        </section>
         <section>
        <h3>Beholde kort</h3>
        <p>
          Du kan beholde fra null til fem kort. Beholder du alle fem,
          trykker du likevel «Bytt kort» for å avslutte runden.
        </p>
        <p>
          Innsatsen er låst under runden. Du kan besøke de andre
          sidene og komme tilbake uten å miste hånden.
        </p>
      </section>

       <section>
        <h3>Gevinster</h3>
        <p>
          I denne varianten gir alle par utbetaling. Ett par gir
          innsatsen tilbake. Høyt kort gir ingen utbetaling.
          Bare den sterkeste kombinasjonen på hånden betales.
        </p>
        <p>
          Utbetalingen er innsatsen ganget med tallet i tabellen.
          Den inkluderer eventuell innsats du får tilbake.
        </p>
      <PayoutTable />
       </section>
    </main>
  );
}

// Trenger ingenting inn. Gir tilbake siden med spilleregler og utbetalingstabellen.
