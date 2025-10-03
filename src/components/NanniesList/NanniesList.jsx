import { useEffect } from "react";
import NannyItem from "../NannyItem/NannyItem.jsx";
import s from "./NanniesList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchNannies } from "../../redux/api/api.js";

export default function NanniesList() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  console.log(filters);
  const { items, loading, loadingMore, total, error, page, perPage } =
    useSelector((state) => state.nannies);

  useEffect(() => {
    dispatch({ type: "nannies/resetItems" });
    dispatch(fetchNannies({ page: 1, perPage, filters }));
  }, [dispatch, perPage, filters]);

  const handleLoadMore = () => {
    dispatch(fetchNannies({ page: page + 1, perPage, filters }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul className={s.nannies}>
        {items.length === 0 ? (
          <p className={s.notFound}>No nannies found</p>
        ) : (
          items.map((nanny, index) => <NannyItem key={index} nanny={nanny} />)
        )}
      </ul>

      {items.length > 0 && items.length < total && !loadingMore && (
        <div className={s.moreWrapper}>
          <button
            className={s.btn}
            type="button"
            loading={true}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
