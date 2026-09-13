import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usePlayers } from "./usePlayers";

type GameState = {
    bet: number;
    setBet: (amount: number) => void;
};


export const useGame = create<GameState>()(
  persist(
    (set) => ({
      bet: 1,

      // Oppdaterer innsatsen hvis valgt spiller har råd.
      // Tar imot et positivt heltall og returnerer ingen verdi.
      setBet: (amount) => {
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
    }),
    {
      name: "video-poker-game",
    }
  )
);