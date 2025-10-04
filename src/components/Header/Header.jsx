import logo from "../../assets/logo/logo.svg";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice.js";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase.js";
import UserIcon from "../../assets/user.svg?react";
import {
  closeRegister,
  closeLogin,
  openRegister,
  openLogin,
} from "../../redux/modal/modalSlice.js";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { registerOpen, loginOpen } = useSelector((state) => state.modal);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <header className={`${s.header} ${isHome ? s.hero : s.green}`}>
      <img src={logo} alt="Logo" />
      <div className={s.option}>
        <Navigation />
        <div className={s.btns}>
          {user ? (
            <>
              <div className={s.user}>
                <div className={s.userIcon}>
                  <UserIcon />
                </div>

                <p className={s.name}>{user.name}</p>
              </div>
              <button className={s.btnLogOut} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className={s.btnLogIn}
                onClick={() => dispatch(openLogin())}
              >
                Log In
              </button>
              <button
                className={s.btnReg}
                onClick={() => dispatch(openRegister())}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      <Modal isOpen={loginOpen} onClose={() => dispatch(closeLogin())}>
        <LoginForm />
      </Modal>

      <Modal isOpen={registerOpen} onClose={() => dispatch(closeRegister())}>
        <RegisterForm />
      </Modal>
    </header>
  );
}
