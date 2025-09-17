import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  const active = ({ isActive }) => {
    return clsx(s.navLink, isActive && s.active);
  };

  return (
    <nav className={s.nav}>
      <NavLink to="/" className={active}>
        Home
      </NavLink>
      <NavLink to="/nannies" className={active}>
        Nannies
      </NavLink>
      <NavLink to="/favorites" className={active}>
        Favorites
      </NavLink>
    </nav>
  );
}
