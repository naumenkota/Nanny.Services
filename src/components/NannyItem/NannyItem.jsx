import s from "./NannyItem.module.css";
import calculateAge from "../../utils/calculateAge.js";
import formatCharacters from "../../utils/formatCharacters.js";
import FavoriteToggle from "../FavoriteToggle/FavoriteToggle.jsx";
import LocationIcon from "../../assets/location.svg?react";
import RateIcon from "../../assets/rate.svg?react";
import OnlineIcon from "../../assets/online.svg?react";
import VectorIcon from "../../assets/vector.svg?react";
import { useState } from "react";
import Reviews from "../Reviews/Reviews.jsx";

export default function NannyItem({ nanny }) {
  const [showReviews, setShowReviews] = useState(false);

  const handleReadMore = () => {
    setShowReviews(true);
  };

  return (
    <div className={s.nannyItem}>
      <div className={s.photoWrapper}>
        <OnlineIcon className={s.online} />
        <img src={nanny.avatar_url} alt={nanny.name} className={s.photo} />
      </div>

      <div className={s.wrapper}>
        <div className={s.topInfo}>
          <div className={s.nameInfo}>
            <p className={s.nanny}>Nanny</p>
            <p className={s.name}>{nanny.name}</p>
          </div>

          <div>
            <div className={s.toggleWrapper}>
              <div className={s.generalInfo}>
                <div className={s.location}>
                  <LocationIcon />
                  <p className={s.text}>{nanny.location}</p>
                </div>
                <VectorIcon />
                <div className={s.rating}>
                  <RateIcon />
                  <p className={s.text}>Rating: {nanny.rating.toFixed(1)}</p>
                </div>
                <VectorIcon />
                <p className={s.text}>
                  Price / 1 hour:
                  <span className={s.span}> {nanny.price_per_hour}$</span>
                </p>
              </div>

              <FavoriteToggle nanny={nanny} />
            </div>
          </div>
        </div>

        <ul className={s.list}>
          <li className={s.item}>
            <p className={`${s.text}  ${s.textGray}`}>Age:</p>
            <p className={s.text} style={{ textDecoration: "underline" }}>
              {calculateAge(nanny.birthday)}
            </p>
          </li>
          <li className={s.item}>
            <p className={`${s.text}  ${s.textGray}`}>Experience:</p>
            <p className={s.text}>{nanny.experience}</p>
          </li>
          <li className={s.item}>
            <p className={`${s.text}  ${s.textGray}`}>Kids Age:</p>
            <p className={s.text}>{nanny.kids_age}</p>
          </li>
          <li className={s.item}>
            <p className={`${s.text}  ${s.textGray}`}>Characters:</p>
            <p className={s.text}> {formatCharacters(nanny.characters)}</p>
          </li>
          <li className={s.item}>
            <p className={`${s.text}  ${s.textGray}`}>Education:</p>
            <p className={s.text}>{nanny.education}</p>
          </li>
        </ul>

        <p className={s.about}>{nanny.about}</p>

        {!showReviews ? (
          <button type="button" className={s.readMore} onClick={handleReadMore}>
            Read more
          </button>
        ) : (
          <Reviews reviews={nanny.reviews} nanny={nanny} />
        )}
      </div>
    </div>
  );
}
