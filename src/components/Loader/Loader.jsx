import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.loader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
