import FilterBar from "../../components/FilterBar/FilterBar.jsx";
import NanniesList from "../../components/NanniesList/NanniesList.jsx";
import Container from "../../components/Container/Container.jsx";

export default function Nannies() {
  return (
    <Container>
      <FilterBar />
      <NanniesList />
    </Container>
  );
}
