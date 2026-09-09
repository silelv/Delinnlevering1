import { NavLink } from "react-router";


export default function Header() {
  return (
    <header>
        <h1>Video poker</h1>

        <nav>
            <NavLink to="/" end>Spill</NavLink>
            <NavLink to="/player">Velg spiller</NavLink>
            <NavLink to="/rules">Spilleregler</NavLink>
        </nav>
    </header>
  )
}
