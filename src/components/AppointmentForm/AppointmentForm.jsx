import s from "./AppointmentForm.module.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import TimePicker from "../TimePicker/TimePicker.jsx";

const AppointmentFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Adress is required"),
  tel: yup.string().min(12, "Too short").required("Number is required"),
  age: yup
    .string()
    .matches(/^\d+$/, "Age must be a number")
    .required("Age is required"),
  time: yup.string().required("Choose the time"),
});

export default function AppointmentForm({ onClose, nanny }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(AppointmentFormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={s.wrapper}>
      <CloseButton onClose={onClose} />

      <h2 className={s.title}>Make an appointment with a babysitter</h2>
      <p className={s.text}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>

      <div className={s.photoWrapper}>
        <img src={nanny.avatar_url} alt={nanny.name} className={s.photo} />

        <div className={s.nameInfo}>
          <p className={s.nanny}>Your nanny</p>
          <p className={s.name}>{nanny.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.smallInputs}>
          <div className={s.inputWrapper}>
            <input
              {...register("address")}
              placeholder="Address"
              className={s.smallInput}
            />
            <ErrorMessage message={errors.address?.message} />
          </div>
          <div className={s.inputWrapper}>
            <input
              {...register("tel")}
              placeholder="+380"
              className={s.smallInput}
            />
            <ErrorMessage message={errors.tel?.message} />
          </div>

          <div className={s.inputWrapper}>
            <input
              {...register("age")}
              placeholder="Child's age"
              className={s.smallInput}
            />
            <ErrorMessage message={errors.age?.message} />
          </div>

          <div className={s.inputWrapper}>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <TimePicker value={field.value} onChange={field.onChange} />
              )}
            />
            <ErrorMessage message={errors.time?.message} />
          </div>
        </div>

        <div className={s.bigInputs}>
          <div className={s.inputWrapper}>
            <input
              {...register("email")}
              placeholder="Email"
              className={s.bigInput}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>

          <div className={s.inputWrapper}>
            <input
              {...register("name")}
              placeholder="Father's or mother's name"
              className={s.bigInput}
            />
            <ErrorMessage message={errors.name?.message} />
          </div>

          <textarea
            {...register("comment")}
            placeholder="Comment"
            className={s.textarea}
          ></textarea>
        </div>
        <button className={s.btn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
