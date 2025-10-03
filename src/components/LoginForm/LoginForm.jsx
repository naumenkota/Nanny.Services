import s from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, database } from "../../services/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import { useState } from "react";
import PasswordToggle from "../PasswordToggle/PasswordToggle.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/authSlice.js";
import { ref, child, get } from "firebase/database";

const LoginFormSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data) => {
    console.log("Logging in with:", data);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const result = await get(child(ref(database), "users"));
      const users = result.val();
      const userFromDB = Object.values(users).find(
        (u) => u.email === data.email
      );

      dispatch(setUser(userFromDB));

      onClose();
      console.log("User logged in and saved", user);
    } catch (error) {
      console.error("Login error:", error.code, error.message);
    }
  };

  return (
    <div className={s.wrapper}>
      <CloseButton onClose={onClose} />
      <h2 className={s.title}>Log In</h2>
      <p className={s.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputGroup}>
          <div className={s.inputWrapper}>
            <input
              {...register("email")}
              placeholder="Email"
              className={s.input}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div className={s.inputWrapper}>
            <input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className={s.input}
            />
            <PasswordToggle
              show={showPassword}
              toggle={() => setShowPassword((prev) => !prev)}
            />
            <ErrorMessage message={errors.password?.message} />
          </div>
        </div>

        <button type="submit" className={s.btn}>
          Log In
        </button>
      </form>
    </div>
  );
}
