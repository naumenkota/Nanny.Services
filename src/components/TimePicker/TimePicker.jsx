import { useState, useEffect, useRef } from "react";
import s from "./TimePicker.module.css";
import ClockIcon from "../../assets/clock.svg?react";

export default function TimePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [times, setTimes] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const t = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hh = h.toString().padStart(2, "0");
        const mm = m.toString().padStart(2, "0");
        t.push(`${hh}:${mm}`);
      }
    }
    setTimes(t);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (time) => {
    onChange(time);
    setIsOpen(false);
  };

  return (
    <div className={s.dropdown} ref={dropdownRef}>
      <div className={s.input} onClick={() => setIsOpen((prev) => !prev)}>
        {value || "00:00"}

        <ClockIcon />
      </div>

      {isOpen && (
        <div className={s.optionWrapper}>
          <p className={s.text}>Meeting time</p>
          <ul className={s.menu}>
            {times.map((time) => (
              <li
                key={time}
                onClick={() => handleSelect(time)}
                className={`${s.option} ${time === value ? s.selected : ""}`}
              >
                {time.replace(":", " : ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
