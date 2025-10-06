import { useSelector } from "react-redux";
import NannyItem from "../../components/NannyItem/NannyItem.jsx";
import s from "./Favorites.module.css";
import Container from "../../components/Container/Container.jsx";
import FilterBar from "../../components/FilterBar/FilterBar.jsx";
import { useState } from "react";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const { sortBy, sortOrder, priceFilter } = useSelector(
    (state) => state.filters
  );
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredFavorites = favorites
    .filter((nanny) => {
      if (priceFilter === "under10") return nanny.price_per_hour < 10;
      if (priceFilter === "above10") return nanny.price_per_hour >= 10;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        if (sortOrder === "asc") return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "rating") {
        if (sortOrder === "asc") return a.rating - b.rating;
        return b.rating - a.rating;
      }
      return 0;
    });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleFavorites = filteredFavorites.slice(0, visibleCount);

  return (
    <Container>
      <FilterBar />
      {filteredFavorites.length === 0 ? (
        <p className={s.empty}>No favorite nannies match your filters.</p>
      ) : (
        <div className={s.favorites}>
          {visibleFavorites.map((nanny) => (
            <NannyItem key={nanny.uniqueKey} nanny={nanny} />
          ))}
        </div>
      )}

      {visibleCount < filteredFavorites.length && (
        <div className={s.moreWrapper}>
          <button className={s.btn} type="button" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </Container>
  );
}
