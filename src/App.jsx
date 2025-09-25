import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Nannies from "./pages/Nannies/Nannies";
import Container from "./components/Container/Container";

function App() {
  return (
    <>
      <Home />

      <Routes></Routes>
    </>
  );
}

export default App;
