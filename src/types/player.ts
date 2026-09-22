import type { RoundLog } from "./roundLog";

export type Player = {
  id: string;
  name: string;
  coins: number;
   log?: RoundLog[];
};


