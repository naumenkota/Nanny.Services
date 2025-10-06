import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Header from "./components/Header/Header.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import useAuthListener from "./hooks/useAuthListener.js";

export default function App() {
  useAuthListener();
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nannies" element={<Nannies />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
