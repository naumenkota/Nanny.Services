import s from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../services/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

export default function LoginForm() {
  const LoginFormSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Log In</h2>
      <p className={s.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>
      <form>
        <div className={s.inputGroup}>
          <div className={s.inputWrapper}>
            <input placeholder="Email" className={s.input} />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div className={s.inputWrapper}>
            <input placeholder="Password" className={s.input} />
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
