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
import { setUser, logout } from "./redux/auth/authSlice.js";
import { ref, get, child } from "firebase/database";
import Favorites from "./pages/Favorites/Favorites.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await get(child(ref(database), "users"));
        const users = snapshot.val();
        const userFromDB = Object.values(users).find(
          (u) => u.email === user.email
        );

        dispatch(
          setUser(
            userFromDB || {
              email: user.email,
              name: user.displayName || "",
              uid: user.uid,
            }
          )
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nannies" element={<Nannies />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Container>

      
    </>
  );
}

export default App;
