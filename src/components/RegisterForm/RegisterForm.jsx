import s from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, database } from "../../services/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import { useState } from "react";
import PasswordToggle from "../PasswordToggle/PasswordToggle.jsx";
import { useDispatch } from "react-redux";
import { closeRegister } from "../../redux/modal/modalSlice.js";
import { toast } from "react-hot-toast";

const RegisterFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeRegister());
  };
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await set(ref(database, `users/${user.uid}`), {
        name: data.name,
        email: data.email,
      });

      handleClose();
    } catch (error) {
      console.error("Registration error:", error.message);

      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please use another one.");
      } else {
        toast.error(
          "An error occurred during registration. Please try again later."
        );
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <CloseButton onClose={handleClose} />

      <h2 className={s.title}>Registration</h2>
      <p className={s.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputGroup}>
          <div className={s.inputWrapper}>
            <input
              {...register("name")}
              placeholder="Name"
              className={s.input}
            />
            <ErrorMessage message={errors.name?.message} />
          </div>
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

        <div className={s.btnWrapper}>
          <button type="submit" className={s.btn}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
