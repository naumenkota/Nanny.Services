import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import s from "./Home.module.css";
import Container from "../../components/Container/Container";

export default function Home() {
  return (
    <div className={s.home}>
      <div className={s.background}></div>
      <Container>
        <Header />
        <Hero />
      </Container>
    </div>
  );
}
