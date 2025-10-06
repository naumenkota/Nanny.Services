import s from "./FavoriteToggle.module.css";
import HeartIcon from "../../assets/heart.svg?react";
import HeartPressedIcon from "../../assets/heartpressed.svg?react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { openRegister } from "../../redux/modal/modalSlice.js";

export default function FavoriteToggle({ nanny }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = favorites.some(
    (item) => item.uniqueKey === nanny.uniqueKey
  );

  const handleToggle = () => {
    if (!user?.uid) {
      dispatch(openRegister());
      return;
    }

    if (isLoading) return;

    dispatch(toggleFavorite({ nanny, uid: user.uid }));
  };

  return (
    <>
      <button className={s.btn} onClick={handleToggle}>
        {isFavorite ? <HeartPressedIcon /> : <HeartIcon />}
      </button>
    </>
  );
}
