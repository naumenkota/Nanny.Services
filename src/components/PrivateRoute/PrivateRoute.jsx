import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { openRegister } from "../redux/modalSlice.js";
import { useDispatch } from "react-redux";

export default function PrivateRoute({ component: Component }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) {
    dispatch(openRegister());
    return null;
  }

  return <Component />;
}
