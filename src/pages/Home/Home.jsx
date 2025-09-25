import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import s from "./Home.module.css";

export default function Home() {
  return (
    <div className={s.home}>
      <Header />
      <Hero />
    </div>
  );
}
