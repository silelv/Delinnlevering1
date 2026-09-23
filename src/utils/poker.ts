import type { PlayingCard } from "../types/playingCard";
import type { PokerHand } from "../types/pokerHand";

export function countValues(hand: PlayingCard[]): Record<number, number> {
  const counts: Record<number, number> = {};

  for (const card of hand) {
    const value = card.value;

    if (counts[value] === undefined) {
      counts[value] = 1;
    } else {
      counts[value] += 1;
    }
  }

  return counts;
}

// Tar inn hånda og teller kort med samme verdi
// Gir tilbake hver verdi og hvor mange kort vi har av den

export function evaluateHand(hand: PlayingCard[]): PokerHand {
  if (hand.length !== 5) {
    throw new Error("Hånden må inneholde fem kort.");
  }

  const counts = countValues(hand);
  const amounts = Object.values(counts);
  const sortedValues = hand.map((card) => card.value).sort((a, b) => a - b);
  const isFlush = hand.every((card) => card.suit === hand[0].suit);
  const isConsecutive = sortedValues.every(
    (value, index) => value === sortedValues[0] + index,
  );
  const isAceHigh = sortedValues.join(",") === "1,10,11,12,13";
  const isStraight = isConsecutive || isAceHigh;

  if (isFlush && isAceHigh) {
    return "royal-flush";
  }

  if (isFlush && isStraight) {
    return "straight-flush";
  }

  if (amounts.includes(4)) {
    return "four-of-a-kind";
  }

  if (amounts.includes(3) && amounts.includes(2)) {
    return "full-house";
  }

  if (isFlush) {
    return "flush";
  }

  if (isStraight) {
    return "straight";
  }

  if (amounts.includes(3)) {
    return "three-of-a-kind";
  }

  const pairs = amounts.filter((amount) => amount === 2).length;

  if (pairs === 2) {
    return "two-pair";
  }

  if (pairs === 1) {
    return "one-pair";
  }

  return "high-card";
}

// Sjekker kortene på hånden og gir tilbake den beste pokerhånden
