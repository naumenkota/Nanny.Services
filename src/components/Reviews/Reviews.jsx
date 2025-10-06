import s from "./Reviews.module.css";
import RateIcon from "../../assets/rate.svg?react";
import { useState } from "react";
import AppointmentForm from "../AppointmentForm/AppointmentForm.jsx";
import Modal from "../Modal/Modal.jsx";

export default function Reviews({ reviews, nanny }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className={s.wrapper}>
      <ul className={s.reviewsList}>
        {reviews.map((review, idx) => (
          <li key={idx}>
            <div className={s.topInfo}>
              <div className={s.avatar}>{review.reviewer[0].toUpperCase()}</div>
              <div className={s.topInfoRigth}>
                <p>{review.reviewer}</p>
                <div className={s.rate}>
                  <RateIcon />
                  <p>{review.rating.toFixed(1)}</p>
                </div>
              </div>
            </div>
            <p className={s.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>

      <button type="button" className={s.btn} onClick={() => setShowForm(true)}>
        Make an appointment
      </button>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <AppointmentForm onClose={() => setShowForm(false)} nanny={nanny} />
      </Modal>
    </div>
  );
}
