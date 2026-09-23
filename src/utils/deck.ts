import type { PlayingCard } from "../types/playingCard";

const suits: PlayingCard["suit"][] = ["hearts", "diamonds", "clubs", "spades"];

const values: PlayingCard["value"][] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
];

export function createDeck(): PlayingCard[] {
  const deck: PlayingCard[] = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  return deck;
}

// Lager alle 52 kortene med farge og verdi
// Trenger ingenting inn og gir tilbake en liste med kortene

export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temp = shuffledDeck[i];
    shuffledDeck[i] = shuffledDeck[randomIndex];
    shuffledDeck[randomIndex] = temp;
  }

  return shuffledDeck;
}

// Tar inn en kortstokk, lager en kopi og stokker kortene
// Gir tilbake den stokkede kopien
