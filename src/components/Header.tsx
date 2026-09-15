import { NavLink } from "react-router";
import styles from "../componentcss/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Video poker</h1>

      <nav className={styles.nav} aria-label="Hovedmeny">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Spill
        </NavLink>
        <NavLink
          to="/player"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Velg spiller
        </NavLink>
        <NavLink
          to="/rules"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Spilleregler
        </NavLink>
      </nav>
    </header>
  );
}
