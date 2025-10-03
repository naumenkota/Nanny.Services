import s from "./FilterBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  setSort,
  resetFilters,
  setPriceFilter,
} from "../../redux/filter/filterSlice.js";
import DownArrowIcon from "../../assets/chevron-down.svg?react";

const options = [
  { label: "A to Z", sortBy: "name", sortOrder: "asc" },
  { label: "Z to A", sortBy: "name", sortOrder: "desc" },
  { label: "Less than 10$", priceFilter: "under10" },
  { label: "Greater than 10$", priceFilter: "above10" },
  { label: "Popular", sortBy: "rating", sortOrder: "desc" },
  { label: "Not popular", sortBy: "rating", sortOrder: "asc" },
  { label: "Show all" },
];

export default function FilterBar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("A to Z");
  const dispatch = useDispatch();

  const handleSelect = (option) => {
    setSelected(option.label);
    setOpen(false);

    if (option.sortBy) {
      dispatch(setSort({ sortBy: option.sortBy, sortOrder: option.sortOrder }));
      dispatch(setPriceFilter(null));
    }

    if (option.priceFilter) {
      dispatch(setPriceFilter(option.priceFilter));
    }

    if (option.label === "Show all") {
      dispatch(resetFilters());
    }
  };

  return (
    <div className={s.wrapper}>
      <p className={s.text}>Filters</p>
      <button
        className={s.btn}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected}
        <DownArrowIcon />
      </button>

      {open && (
        <ul className={s.filters}>
          {options.map((option) => (
            <li
              className={`${s.filter} ${
                selected === option.label ? s.selected : ""
              }`}
              key={option.label}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
