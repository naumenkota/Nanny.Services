import s from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, database } from "../../services/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

const RegisterFormSchema = yup.object().shape({
  name: yup.string().min(2).required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export default function RegisterForm() {
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
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Registration</h2>
      <p className={s.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" className={s.input} />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}

        <input {...register("email")} placeholder="Email" className={s.input} />
        {errors.email && <p className={s.error}>{errors.email.message}</p>}

        <input
          {...register("password")}
          placeholder="Password"
          className={s.input}
        />
        {errors.password && (
          <p className={s.error}>{errors.password.message}</p>
        )}

        <button type="submit" className={s.btn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
