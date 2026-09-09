import type { PlayingCard } from "../types/playingCard"
import styles from "../componentcss/Card.module.css"

type CardProps = {
    card: PlayingCard;
}

export default function Card({ card }: CardProps) {
    const symbols ={
        hearts: "❤️",
        diamonds: "♦️",
        clubs: "♣️",
        spades: "♠️",
    }

    const displayValue = 
        card.value === 1 ? "A":
        card.value === 11 ? "J" :
        card.value === 12 ? "Q" :
        card.value === 13 ? "K" :
        card.value;
    
        const isRed = card.suit === "hearts" || card.suit === "diamonds";
        
  return (
    <div className={`${styles.card} ${isRed ? styles.red : styles.black}`}>
        <span>{symbols[card.suit]}</span>
        <span>{displayValue}</span>
    </div>
  )

  //Dette er funksjonen som skal vise verdi og hvilket symbol kortet har
}
