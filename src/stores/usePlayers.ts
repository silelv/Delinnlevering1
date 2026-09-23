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

      // Tar inn spillerens id og setter hvem som er valgt
      // Gir ingen verdi tilbake

      removePlayer: (id) => {
        set((state) => ({
          players: state.players.filter((player) => player.id !== id),
          selectedPlayerId:
            state.selectedPlayerId === id ? null : state.selectedPlayerId,
        }));
      },

      // Tar inn en id og fjerner spilleren med samme id fra listen
      // Gir ingen verdi tilbake

      addPlayer: (name) => {
        const newPlayer: Player = {
          id: crypto.randomUUID(),
          name: name,
          coins: 100,
          log: [],
        };

        // Legger til en ny spiller med navn, unik id og 100 mynter.
        // Gir ingenting tilbake

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

      // Tar inn spillerens id og resultatet fra en runde
      // Legger runden i loggen og beholder de 10 nyeste. Gir ingen verdi tilbake

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

      // Tar inn spillerens id og antall mynter som skal legges til saldoen
      // Legger til myntene hvis antallet er et positivt heltall. Gir ingen verdi tilbake

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

      // Tar inn spillerens id og innsatsen. Sjekker at innsatsen er et positivt heltall
      // og at spilleren har nok mynter. Trekker innsatsen og gir true hvis det stemmer,
      // ellers false.
    }),
    {
      name: "video-poker-players",
    },
  ),
);
