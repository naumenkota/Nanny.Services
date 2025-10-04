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
  const isLoading = useSelector((state) => state.auth.isLoading);
  const favorites = useSelector((state) => state.favorites.items);
  const [registerOpen, setRegisterOpen] = useState(false);
  console.log("FavoriteToggle user:", user, "isLoading:", isLoading);
  const isFavorite = favorites.some(
    (item) => item.uniqueKey === nanny.uniqueKey
  );

  const handleToggle = () => {
    if (isLoading) return;

    if (!user?.uid) {
      setRegisterOpen(true);
      return;
    }
    console.log("FavoriteToggle user:", user, "isLoading:", isLoading);
    dispatch(toggleFavorite({ nanny, uid: user.uid }));
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
