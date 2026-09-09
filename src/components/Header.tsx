import { NavLink } from "react-router";


export default function Header() {
  return (
    <header>
        <h1>Video poker</h1>

        <nav>
            <NavLink to="/" end>Spill</NavLink>
            <NavLink to="/player">Spilleregler</NavLink>
            <NavLink to="/rules">Velg spiller</NavLink>
        </nav>
    </header>
  )
}
