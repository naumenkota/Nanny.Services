import s from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return <p className={s.error}> {message}</p>;
}
