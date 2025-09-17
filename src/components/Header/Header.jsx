import logo from "../../assets/logo/logo.svg";
import s from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={s.header}>
      <img src={logo} alt="Logo" />

      <div className="auth-buttons">
        <button>Log In</button>
        <button>Register</button>
      </div>
    </header>
  );
}
