
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Game from "./pages/Game";
import Player from "./pages/Player";
import Rules from "./pages/Rules";
import './App.css'

export default function App() {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/player" element={<Player />} />
            <Route path="/rules" element={<Rules />} />
            </Routes>
        </>
    )
}
