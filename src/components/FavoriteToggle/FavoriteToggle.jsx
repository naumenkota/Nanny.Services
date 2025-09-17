import s from "./FavoriteToggle.module.css";
import HeartIcon from "../../assets/heart.svg?react";
import HeartPressedIcon from "../../assets/heartpressed.svg?react";

export default function FavoriteToggle({ isFavorite, onChange }) {
  return (
    <button className={s.btn} onClick={onChange}>
      {isFavorite ? <HeartPressedIcon /> : <HeartIcon />}
    </button>
  );
}
