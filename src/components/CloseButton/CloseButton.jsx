import s from "./CloseButton.module.css";
import XIcon from "../../assets/x.svg?react";

export default function CloseButton({ onClose }) {
  return (
    <button type="button" className={s.closeBtn} onClick={onClose}>
      <XIcon className={s.xIcon} />
    </button>
  );
}
