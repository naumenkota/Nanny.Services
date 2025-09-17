import s from "./Reviews.module.css";
import RateIcon from "../../assets/rate.svg?react";

export default function Reviews({ reviews }) {
  return (
    <div>
      <div>
        {reviews.map((review, idx) => (
          <div key={idx}>
            <p>{review.reviewer}</p>
            <div>
              <RateIcon />
              <p>{review.rating}</p>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <button type="button">Make an appointment</button>
    </div>
  );
}
