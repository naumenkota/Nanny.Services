import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Container from "./components/Container/Container";
import AppointmentForm from "./components/AppointmentForm/AppointmentForm";
import FilterBar from "./components/FilterBar/FilterBar";
import Header from "./components/Header/Header.jsx";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, database } from "./services/firebase.js";
import { setUser, logout, setLoading } from "./redux/auth/authSlice.js";
import { ref, get, child } from "firebase/database";
import Favorites from "./pages/Favorites/Favorites.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import {
  handleAuthActions,
  clearFavorites,
} from "./redux/favorites/favoritesSlice.js";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await get(child(ref(database), "users"));
        const users = snapshot.val();
        const userFromDB = Object.values(users).find(
          (u) => u.email === user.email
        );

        const finalUser = {
          ...(userFromDB || {}),
          email: user.email,
          name: userFromDB?.name || user.displayName || "",
          uid: user.uid,
        };

        dispatch(setUser(finalUser));

        handleAuthActions({ type: setUser.type, payload: finalUser }, dispatch);
      } else {
        clearFavorites({ uid: undefined })(dispatch);
        dispatch(logout());
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

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
