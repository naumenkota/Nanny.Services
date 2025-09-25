import logo from "../../assets/logo/logo.svg";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className={s.header}>
      <img src={logo} alt="Logo" />
      <div className={s.option}>
        <Navigation />
        <div className={s.btns}>
          <button className={s.btnLogIn}>Log In</button>
          <button className={s.btnReg}>Register</button>
        </div>
      </div>
    </header>
  );
}
