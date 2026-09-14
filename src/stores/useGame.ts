import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usePlayers } from "./usePlayers";
import type { PlayingCard } from "../types/playingCard";
import { createDeck, shuffleDeck } from "../utils/deck";

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
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      bet: 1,
      phase: "ready",
      deck: [],
      hand: [],
      discardedCards: [],
      heldCards: [],
      resetGame: () => {
        if (get().phase === "holding") return;

        set({
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
        const { phase, hand, deck, heldCards } = get();

        if (phase !== "holding") {
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

        set({
          hand: newHand,
          deck: remainingDeck,
          discardedCards: discardedCards,
          phase: "finished",
        });
      },

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
        });
      },
    }),
    {
      name: "video-poker-game",
    },
  ),
);
