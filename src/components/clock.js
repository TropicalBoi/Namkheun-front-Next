import { React, useState, useEffect } from "react";
import style from "../../styles/clock.module.css";

const Clock = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className={style.clock}>
      {date.toLocaleTimeString("en-GB")}
      <div className={style.date}>
        <div className={style.shortDays}>{shortDays[date.getDay()]}&nbsp;</div>
        <div className={style.fullDays}>{days[date.getDay()]}&nbsp;</div>
        {monthNames[date.getMonth()]}&nbsp;
        {date.getDate()}&nbsp;
        {date.getFullYear()}
      </div>
    </div>
  );
};

export default Clock;
