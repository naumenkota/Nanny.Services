import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref, child } from "firebase/database";
import { useDispatch } from "react-redux";
import { setUser, logout, setLoading } from "../redux/auth/authSlice.js";
import {
  clearFavorites,
  handleAuthActions,
} from "../redux/favorites/favoritesSlice.js";
import { auth, database } from "../services/firebase.js";

export default function useAuthListener() {
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
        dispatch(clearFavorites());
        dispatch(logout());
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);
}
