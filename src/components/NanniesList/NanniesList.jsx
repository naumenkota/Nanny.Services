import { useEffect } from "react";
import NannyItem from "../NannyItem/NannyItem.jsx";
import s from "./NanniesList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchNannies } from "../../redux/api/api.js";
import Loader from "../Loader/Loader.jsx";

export default function NanniesList() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const { items, loading, loadingMore, total, page, perPage } = useSelector(
    (state) => state.nannies
  );

  useEffect(() => {
    dispatch({ type: "nannies/resetItems" });
    dispatch(fetchNannies({ page: 1, perPage, filters }));
  }, [dispatch, perPage, filters]);

  const handleLoadMore = () => {
    dispatch(fetchNannies({ page: page + 1, perPage, filters }));
  };

  return (
    <div>
      {loading ? (
        <div className={s.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <ul className={s.nannies}>
          {items.length === 0 ? (
            <p className={s.notFound}>No nannies found</p>
          ) : (
            items.map((nanny, index) => <NannyItem key={index} nanny={nanny} />)
          )}
        </ul>
      )}

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

      {loadingMore && (
        <div className={s.moreWrapper}>
          <Loader />
        </div>
      )}
    </div>
  );
}
