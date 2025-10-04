import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, redirectTo = "/" }) {
  const { user, isLoggedIn, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return null;
  console.log("PrivateRoute check:", { user, isLoggedIn });

  if (!user || !isLoggedIn) {
    console.log("Redirecting to", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
