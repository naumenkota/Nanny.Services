import s from "./Home.module.css";
import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/arrow.svg?react";
import CheckIcon from "../../assets/check.svg?react";

export default function Home() {
  return (
    <div className={s.home}>
      <div className={s.background}></div>
      <div className={s.wrapper}>
        <div className={s.line}></div>
        <div className={s.info}>
          <h1 className={s.title}>Make Life Easier for the Family:</h1>
          <p className={s.text}>Find Babysitters Online for All Occasions</p>
          <Link to="/nannies" className={s.btn}>
            Get started
            <ArrowIcon />
          </Link>
        </div>
      </div>
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
