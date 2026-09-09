import Card from "../components/Card"

export default function Game() {
  return (
    <main>
   <h2>Spill</h2>
   <Card card={{ suit: "spades", value: 1 }} faceDown />
   </main>
  )
}
