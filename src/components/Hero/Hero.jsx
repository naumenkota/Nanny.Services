import s from "./Hero.module.css";
import ArrowIcon from "../../assets/arrow.svg?react";
import CheckIcon from "../../assets/check.svg?react";

export default function Hero() {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Make Life Easier for the Family:</h1>
      <p className={s.text}>Find Babysitters Online for All Occasions</p>
      <button className={s.btn}>
        Get started
        <ArrowIcon />
      </button>
      <div className={s.exp}>
        <CheckIcon className={s.check} />
        <div className={s.expInfo}>
          <p className={s.expText}>Experienced nannies</p>
          <p className={s.expValue}> 15,000</p>
        </div>
      </div>
    </div>
  );
}
