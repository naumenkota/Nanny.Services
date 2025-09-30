import { useEffect } from "react";
import NannyItem from "../NannyItem/NannyItem.jsx";
import s from "./NanniesList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchNannies } from "../../redux/api/api.js";

export default function NanniesList() {
  const dispatch = useDispatch();
  const { items, loading, loadingMore, total, error, page, perPage } =
    useSelector((state) => state.nannies);

  useEffect(() => {
    dispatch(fetchNannies());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchNannies({ page: page + 1, perPage }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        <li className={s.nannies}>
          {items.map((nanny, index) => (
            <NannyItem key={index} nanny={nanny} />
          ))}
        </li>
      </ul>

      {items.length > 0 && items.length < total && !loadingMore && (
        <div className={s.moreWrapper}>
          <button type="button" loading={true} onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
