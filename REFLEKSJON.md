Refleksjon om Video Poker

I dette prosjektet har jeg lært om React, Zustand og React Router og hvordan disse brukes, og målet har vært å lage ett fungerende spill med video poker. 
Det har vært jævlig vanskelig, og jeg har sparret MYE med chatgpt med feilsøking, retting av kode, prøving og feiling av funksjoner og forklaring av funksjonene. 
Det tok mye tid, og det har vært trått med læring ettersom mange av forelesningene har gått bort, ikke vært forberedt og generelt ikke vært kontinuerlig med læring.

Det som har vært mest lærerikt er måten man bruker react på, at man slipper å skrive alt i html som man gjorde i forrige semester. En positiv ting har vært at jeg kunne github fra før, så det gikk veldig greit med branches og push/pull.
Det er selvsagt mye jobb med dette, men man ser resultater mye raskere med react, som gir meg my mer motivasjon til å lære mer. Det bydde også på mye problemer og sinnsykt mange feilkoder underveis, som gjorde at jeg holdt på å kaste pcen i gulvet ved flere anledninger. 

Jeg har delt opp grensesnittet i komponenter som vi har lært, blant annet for kort, innsats, myntsaldo og utbetalingstabell. Og CSS-moduler til stylingen og gjenbrukte komponenter flere steder.
Forsiden og baksiden av kortene ligger i samme Card-komponent. Enkelt valg, fordi begge er visninger av det samme kortet. Med faceDown kan komponenten vise baksiden uten at jeg trenger en egen komponent med mye av den samme stylingen.
Zustand holder orden på spillerne og spillet. Jeg brukte persist for å lagre dataene i localStorage, slik at en runde ikke forsvinner når siden oppdateres eller spilleren besøker en annen side i appen.

Utfordringer underveis

Det ble sure miner da jeg fikk flere feil med importer, eksport av komponenter og plassering av kommaer og klammer, og selvfølgelig mergekonflikter, fordi hva er github uten mergekonflikter??
En dustefeil oppstod da jeg slettet en CSSfil, men glemte å fjerne importen, som gjorde at hele skiten stoppet å funke, så da lærte jeg at jeg må sjekke hvor en fil brukes før jeg fjerner den.
Jeg måtte jobbe en god del med sammenhengen mellom innsats, saldo og utbetaling, ettersom innsatsen trekkes når kortene deles ut, og utbetalingen legges til etter kortbyttet, så måtte jeg også håndtere at innsatsen kunne være høyere enn saldoen etter en tapt runde. Stress.

Hvordan jeg har lært

Jeg brukte ChatGPT/Codex som støtte og feilsøking og forklaringer. I tillegg brukte jeg den til å quizze meg selv, der vi gjennom funksjonene med spørsmål og svar for å få mest mulig perspektiv på koden.
Denne måten å jobbe på hjalp meg å forstå forskjellen mellom å endre data og å returnere en verdi. I tillegg til bedre forståelse av map, filter, løkker og hvordan kortstokken lages og stokkes.

Det gjenstår fortsatt MYE øving for å kunne skrive alt dette på egen hånd, særlig spillogikken og oppdateringene i Zustand. Samtidig har prosjektet gjort meg tryggere på hvordan komponenter, typer og tilstand henger sammen i en React-app.
