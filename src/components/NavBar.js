import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../assets/logo.png";
import homeIcon from "../assets/home.svg";

const NavBar = () => {
  const formatDateTime = () => {
    const now = new Date();

    // 시간 포맷 (AM/PM)
    const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
    const time = new Intl.DateTimeFormat("en-US", optionsTime)
      .format(now)
      .replace("AM", "AM")
      .replace("PM", "PM");

    // 날짜 포맷 (연도, 월, 일, 요일)
    const optionsDate = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
    };
    const dateParts = new Intl.DateTimeFormat("ko-KR", optionsDate)
      .format(now)
      .replace("일요일", "(일)")
      .replace("월요일", "(월)")
      .replace("화요일", "(화)")
      .replace("수요일", "(수)")
      .replace("목요일", "(목)")
      .replace("금요일", "(금)")
      .replace("토요일", "(토)")
      .split(" ");

    const date = dateParts.slice(0, 3).join(" ") + " " + dateParts[3]; // 지워야함!!!!!!!!!!!!!!!!!!!!!!!!!!!1! 수정

    return { time, date };
  };

  const { time, date } = formatDateTime();

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.dateTime}>
          <div className={styles.time}>
            <strong>{time.split(" ").reverse().join(" ")}</strong>{" "}
          </div>
          <div className={styles.date}>{date}</div>
        </div>
        <img src={logo} alt="Logo" className={styles.logo} />
        <Link to="/main">
          {" "}
          <img src={homeIcon} alt="Home" className={styles.homeIcon} />
        </Link>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default NavBar;
