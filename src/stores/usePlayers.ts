import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player";
import type { RoundLog } from "../types/roundLog";

type PlayersState = {
  players: Player[];
  selectedPlayerId: string | null;
  selectPlayer: (id: string) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  spendCoins: (id: string, amount: number) => boolean;
  addCoins: (id: string, amount: number) => void;
  addRound: (id: string, round: RoundLog) => void;
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
          log: [],
        };

        set((state) => ({
          players: [...state.players, newPlayer],
        }));
      },

      addRound: (id, round) => {
        set((state) => ({
          players: state.players.map((player) => {
            if (player.id !== id) {
              return player;
            }

            const oldLog = player.log ?? [];
            const newLog = [round, ...oldLog];

            return {
              ...player,
              log: newLog.slice(0, 10),
            };
          }),
        }));
      },
      addCoins: (id, amount) => {
        if (!Number.isInteger(amount) || amount <= 0) {
          return;
        }
        set((state) => ({
          players: state.players.map((player) =>
            player.id === id
              ? {
                  ...player,
                  coins: player.coins + amount,
                }
              : player,
          ),
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
