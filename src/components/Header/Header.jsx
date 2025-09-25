import logo from "../../assets/logo/logo.svg";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <header className={s.header}>
      <img src={logo} alt="Logo" />
      <div className={s.option}>
        <Navigation />
        <div className={s.btns}>
          <button className={s.btnLogIn} onClick={() => setLoginOpen(true)}>
            Log In
          </button>
          <button className={s.btnReg} onClick={() => setRegisterOpen(true)}>
            Register
          </button>
        </div>
      </div>

      <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)}>
        <LoginForm onClose={() => setLoginOpen(false)} />
      </Modal>

      <Modal isOpen={registerOpen} onClose={() => setRegisterOpen(false)}>
        <RegisterForm onClose={() => setRegisterOpen(false)} />
      </Modal>
    </header>
  );
}
