import EyeOnIcon from "../../assets/eyeon.svg?react";
import EyeOffIcon from "../../assets/eyeoff.svg?react";
import s from "./PasswordToggle.module.css";

export default function PasswordToggle({ show, toggle }) {
  return (
    <button type="button" onClick={toggle} className={s.eyeIcon}>
      {show ? <EyeOnIcon /> : <EyeOffIcon />}
    </button>
  );
}
