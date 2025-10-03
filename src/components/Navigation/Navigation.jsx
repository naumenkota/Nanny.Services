import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function Navigation() {
  const active = ({ isActive }) => {
    return clsx(s.navLink, isActive && s.active);
  };
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className={s.nav}>
      <NavLink to="/" className={active}>
        Home
      </NavLink>
      <NavLink to="/nannies" className={active}>
        Nannies
      </NavLink>
      {user && (
        <NavLink to="/favorites" className={active}>
          Favorites
        </NavLink>
      )}
    </nav>
  );
}
