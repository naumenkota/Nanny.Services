import s from "./AppointmentForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import { useState } from "react";

const AppointmentFormSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  tel: yup.string().required(),
  age: yup.number().required(),
  time: yup.string().required(),
});

export default function AppointmentForm({ onClose, nanny }) {
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(AppointmentFormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setValue("time", time);
    setIsTimeOpen(false);
  };

  const times = [];
  for (let h = 0; h < 24; h++) {
    times.push(`${h.toString().padStart(2, "0")}:00`);
    times.push(`${h.toString().padStart(2, "0")}:30`);
  }

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
        <input
          {...register("address")}
          placeholder="Address"
          className={s.input}
        />
        <ErrorMessage message={errors.address?.message} />

        <input {...register("tel")} placeholder="+380" className={s.input} />
        <ErrorMessage message={errors.tel?.message} />

        <input
          {...register("age")}
          placeholder="Child's age"
          className={s.input}
        />
        <ErrorMessage message={errors.age?.message} />

        <div className={s.input} onClick={() => setIsTimeOpen(true)}>
          {selectedTime || "Select time"}
        </div>
        <ErrorMessage message={errors.time?.message} />

        <input {...register("email")} placeholder="Email" className={s.input} />
        <ErrorMessage message={errors.email?.message} />

        <input
          {...register("name")}
          placeholder="Father's or mother's name"
          className={s.input}
        />
        <ErrorMessage message={errors.name?.message} />

        <textarea {...register("comment")} placeholder="Comment"></textarea>
        <button className={s.btn} type="submit">
          Send
        </button>
      </form>

      {isTimeOpen && (
        <div className={s.timeOverlay}>
          <div className={s.timeModal}>
            <h2>Meeting time</h2>
            <div className={s.timeGrid}>
              {times.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={selectedTime === time ? s.selected : ""}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <CloseButton onClose={() => setIsTimeOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
