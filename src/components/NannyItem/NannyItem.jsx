import s from "./NannyItem.module.css";
import calculateAge from "../../utils/calculateAge.js";
import formatCharacters from "../../utils/formatCharacters.js";
import FavoriteToggle from "../FavoriteToggle/FavoriteToggle.jsx";
import LocationIcon from "../../assets/location.svg?react";
import RateIcon from "../../assets/rate.svg?react";
import OnlineIcon from "../../assets/online.svg?react";
import VectorIcon from "../../assets/vector.svg?react";

export default function NannyItem({ nanny }) {
  return (
    <div>
      <div className={s.photoWrapper}>
        <OnlineIcon className={s.online} />
        <img src={nanny.avatar_url} alt={nanny.name} className={s.photo} />
      </div>

      <div className={s.topInfo}>
        <p>Nanny</p>

        <div className={s.generalInfo}>
          <div className={s.location}>
            <LocationIcon />
            <p>{nanny.location}</p>
          </div>
          <VectorIcon />
          <div className={s.rating}>
            <RateIcon />
            <p>Rating: {nanny.rating}</p>
          </div>
          <VectorIcon />
          <p>Price / 1 hour: {nanny.price_per_hour}$</p>
        </div>
        <FavoriteToggle />
      </div>

      <p>{nanny.name}</p>
      <ul>
        <li>
          <p>Age:</p>
          <p> {calculateAge(nanny.birthday)}</p>
        </li>
        <li>
          <p>Experience:</p>
          <p>{nanny.experience}</p>
        </li>
        <li>
          <p>Kids Age:</p>
          <p>{nanny.kids_age}</p>
        </li>
        <li>
          <p>Characters:</p>
          <p> {formatCharacters(nanny.characters)}</p>
        </li>
        <li>
          <p>Education:</p>
          <p>{nanny.education}</p>
        </li>
      </ul>
      <p>{nanny.about}</p>

      <button type="button">Show more</button>

      <div>
        {nanny.reviews.map((review, idx) => (
          <div key={idx}>
            <p>{review.reviewer}</p>
            <p>{review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <button type="button">Make an appointment</button>
    </div>
  );
}
