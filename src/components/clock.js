import { React, useState, useEffect } from "react";
import style from "../../styles/clock.module.css"

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

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    
    let timerID = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  
  let time1=date.toLocaleTimeString("en-GB")

  return (
    <div
      className={style.clock}
    >
      {time1}
      <div>
        {days[date.getDay()]}&nbsp;
        {monthNames[date.getMonth()]}&nbsp;
        {date.getDate()}&nbsp;
        {date.getFullYear()}
      </div>
    </div>
  );
};

export default Clock;




