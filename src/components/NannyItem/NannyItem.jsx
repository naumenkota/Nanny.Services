import calculateAge from "../../utils/calculateAge.js";
import formatCharacters from "../../utils/formatCharacters.js";
import FavoriteToggle from "../FavoriteToggle/FavoriteToggle.jsx";
import LocationIcon from "../../assets/location.svg?react";
import RateIcon from "../../assets/rate.svg?react";

export default function NannyItem({ nanny }) {
  return (
    <div>
      <img src={nanny.avatar_url} alt={nanny.name} />
      <p>Nanny</p>

      <div>
        <div>
          <LocationIcon />
          <p>{nanny.location}</p>
        </div>
        <div>
          <RateIcon />
          <p>Rating: {nanny.rating}</p>
        </div>
        <p>Price / 1 hour: {nanny.price_per_hour}$</p>
      </div>
      <FavoriteToggle />

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
