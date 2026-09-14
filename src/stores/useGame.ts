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
};


export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      bet: 1,
      phase: "ready",
      deck: [],
      hand: [],
      discardedCards: [],
      setBet: (amount) => {
  if (get().phase === "holding") {
    return;
  }

  if (!Number.isInteger(amount) || amount < 1) {
    return;
  }

  const { players, selectedPlayerId } = usePlayers.getState();

  const selectedPlayer = players.find(
    (player) => player.id === selectedPlayerId
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
    phase: "holding",
  });
},
    }),
    {
      name: "video-poker-game",
    }
  )
);