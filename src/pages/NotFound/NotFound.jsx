import { useNavigate } from "react-router-dom";
import s from "./NotFound.module.css";
import Container from "../../components/Container/Container.jsx";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <Container>
      <div className={s.wrapper}>
        <h1 className={s.title}>404</h1>
        <h2 className={s.subtitle}>Not found </h2>
        <button className={s.btn} onClick={() => nav(-1)}>
          Go Back
        </button>
      </div>
    </Container>
  );
}
