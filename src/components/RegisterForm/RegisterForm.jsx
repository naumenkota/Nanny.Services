import s from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
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
        <input {...register("email")} placeholder="Email" className={s.input} />
        <input
          {...register("password")}
          placeholder="Password"
          className={s.input}
        />
        <button type="submit" className={s.btn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
