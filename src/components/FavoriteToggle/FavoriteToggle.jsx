import s from "./FavoriteToggle.module.css";
import HeartIcon from "../../assets/heart.svg?react";
import HeartPressedIcon from "../../assets/heartpressed.svg?react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { useState } from "react";
import Modal from "../Modal/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";

export default function FavoriteToggle({ nanny }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.items);
  const [registerOpen, setRegisterOpen] = useState(false);
  const isFavorite = favorites.some(
    (item) => item.uniqueKey === nanny.uniqueKey
  );
  const handleToggle = () => {
    if (!user) {
      setRegisterOpen(true);
      return;
    }

    dispatch(toggleFavorite(nanny));
  };

  return (
    <>
      <button className={s.btn} onClick={handleToggle}>
        {isFavorite ? <HeartPressedIcon /> : <HeartIcon />}
      </button>

      <Modal isOpen={registerOpen} onClose={() => setRegisterOpen(false)}>
        <RegisterForm onClose={() => setRegisterOpen(false)} />
      </Modal>
    </>
  );
}
