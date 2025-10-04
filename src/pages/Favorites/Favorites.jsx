import { useSelector } from "react-redux";
import NannyItem from "../../components/NannyItem/NannyItem.jsx";
import s from "./Favorites.module.css";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);

  if (favorites.length === 0) {
    return <p className={s.empty}>You have no favorite nannies yet.</p>;
  }

  return (
    <div className={s.favoritesPage}>
      {favorites.map((nanny) => (
        <NannyItem key={nanny.uniqueKey} nanny={nanny} />
      ))}
    </div>
  );
}
