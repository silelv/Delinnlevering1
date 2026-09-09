import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player";

type PlayersState = {
    players: Player[];
    addPlayer: (name:string) => void;
    selectedPlayerId: string | null;
    selectPlayer: (id: string) => void;
    removePlayer: (id: string) => void;
}


export const usePlayers = create<PlayersState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "video-poker-players",
    }
  )
);