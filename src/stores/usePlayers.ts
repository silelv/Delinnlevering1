import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player";

type PlayersState = {
  players: Player[];
  selectedPlayerId: string | null;
  selectPlayer: (id: string) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  spendCoins: (id: string, amount: number) => boolean;
};

export const usePlayers = create<PlayersState>()(
  persist(
    (set, get) => ({
      players: [],
      selectedPlayerId: null,
      selectPlayer: (id) => {
        set({ selectedPlayerId: id });
      },

      removePlayer: (id) => {
        set((state) => ({
          players: state.players.filter((player) => player.id !== id),
          selectedPlayerId:
            state.selectedPlayerId === id ? null : state.selectedPlayerId,
        }));
      },

      addPlayer: (name) => {
        const newPlayer: Player = {
          id: crypto.randomUUID(),
          name: name,
          coins: 100,
        };

        set((state) => ({
          players: [...state.players, newPlayer],
        }));
      },
      spendCoins: (id, amount) => {
        const player = get().players.find((player) => player.id === id);

        if (
          !player ||
          !Number.isInteger(amount) ||
          amount < 1 ||
          amount > player.coins
        ) {
          return false;
        }

        set((state) => ({
          players: state.players.map((player) =>
            player.id === id
              ? { ...player, coins: player.coins - amount }
              : player,
          ),
        }));

        return true;
      },
    }),
    {
      name: "video-poker-players",
    },
  ),
);
