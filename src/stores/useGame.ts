import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usePlayers } from "./usePlayers";
import type { PlayingCard } from "../types/playingCard";
import { createDeck, shuffleDeck } from "../utils/deck";
import { calculateWinnings } from "../utils/payouts";
import { evaluateHand } from "../utils/poker";

type GameState = {
  bet: number;
  setBet: (amount: number) => void;
  deck: PlayingCard[];
  hand: PlayingCard[];
  discardedCards: PlayingCard[];
  dealCards: () => void;
  phase: "ready" | "holding" | "finished";
  heldCards: number[];
  toggleHold: (index: number) => void;
  drawCards: () => void;
  resetGame: () => void;
  lastWinnings: number | null;
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      bet: 1,
      lastWinnings: null,
      phase: "ready",
      deck: [],
      hand: [],
      discardedCards: [],
      heldCards: [],
      resetGame: () => {
        if (get().phase === "holding") return;
        // Trenger ingenting inn. Tømmer kortene og setter innsatsen tilbake til 1,
        // hvis ingen runde pågår. Gir ingen verdi tilbake.
        set({
          lastWinnings: null,
          phase: "ready",
          hand: [],
          deck: [],
          discardedCards: [],
          heldCards: [],
          bet: 1,
        });
      },
      toggleHold: (index) => {
        const { phase, hand } = get();

        // Tar inn plassen til et kort og markerer det som beholdt, eller fjerner markeringen.
        // Virker bare mens spilleren velger kort å beholde. Gir ingen verdi tilbake

        if (
          phase !== "holding" ||
          !Number.isInteger(index) ||
          index < 0 ||
          index >= hand.length
        ) {
          return;
        }

        set((state) => ({
          heldCards: state.heldCards.includes(index)
            ? state.heldCards.filter((heldIndex) => heldIndex !== index)
            : [...state.heldCards, index],
        }));
      },

      drawCards: () => {
        const { phase, hand, deck, heldCards, bet } = get();

        if (phase !== "holding") {
          return;
        }

        const { selectedPlayerId, addCoins, addRound } = usePlayers.getState();

        if (!selectedPlayerId) {
          return;
        }

        const remainingDeck = [...deck];
        const discardedCards: PlayingCard[] = [];
        const newHand = hand.map((card, index) => {
          if (heldCards.includes(index)) {
            return card;
          }

          const replacement = remainingDeck.shift();

          if (!replacement) {
            return card;
          }

          discardedCards.push(card);
          return replacement;
        });

        const winnings = calculateWinnings(newHand, bet);

        set({
          hand: newHand,
          deck: remainingDeck,
          discardedCards: discardedCards,
          phase: "finished",
          lastWinnings: winnings,
        });

        addCoins(selectedPlayerId, winnings);
        addRound(selectedPlayerId, {
          id: crypto.randomUUID(),
          hand: evaluateHand(newHand),
          bet: bet,
          winnings: winnings,
        });
      },

      // Trenger ingenting inn. Beholder de markerte kortene og bytter resten
      // med kort fra den stokkede kortstokken. Regner ut utbetalingen, legger til
      // myntene og lagrer runden i loggen. Gir ingen verdi tilbake.

      setBet: (amount) => {
        if (get().phase === "holding") {
          return;
        }

        if (!Number.isInteger(amount) || amount < 1) {
          return;
        }

        const { players, selectedPlayerId } = usePlayers.getState();

        const selectedPlayer = players.find(
          (player) => player.id === selectedPlayerId,
        );

        if (!selectedPlayer || amount > selectedPlayer.coins) {
          return;
        }

        set({ bet: amount });
      },

      // Tar inn ønsket innsats. Endrer den bare hvis den er et heltall på minst 1,
      // spilleren har nok mynter og ingen runde pågår. Gir ingen verdi tilbake

      dealCards: () => {
        const { phase, bet } = get();

        if (phase === "holding") {
          return;
        }

        const { selectedPlayerId, spendCoins } = usePlayers.getState();

        if (!selectedPlayerId) {
          return;
        }

        const shuffledDeck = shuffleDeck(createDeck());
        const paid = spendCoins(selectedPlayerId, bet);

        if (!paid) {
          return;
        }

        set({
          hand: shuffledDeck.slice(0, 5),
          deck: shuffledDeck.slice(5),
          discardedCards: [],
          heldCards: [],
          phase: "holding",
          lastWinnings: null,
        });
      },

      // Trenger ingenting inn. Lager og stokker kortstokken, trekker innsatsen
      // og deler ut fem kort hvis spilleren kan betale. Gjør det mulig å velge
      // kort som skal beholdes. Gir ingen verdi tilbake.
    }),
    {
      name: "video-poker-game",
    },
  ),
);
