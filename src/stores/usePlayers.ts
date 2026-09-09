import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player";

type PlayersState = {
    players: Player[];
    addPlayer: (name:string) => void;
}


export const usePlayers = create<PlayersState>()(
  persist(
    (set) => ({
      players: [],
      
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