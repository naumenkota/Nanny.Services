import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";

export default function PrivateRoute({ children, redirectTo = "/" }) {
  const { user, isLoggedIn, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <Loader />;

  if (!user || !isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
