import { React, useState, useEffect } from "react";
import { css } from "@emotion/react";

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
    var timerID = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        width: 22.39vw;
        height: 6.969vh;
        font-family: ABC-Marfa-Mono;
        font-style: normal;
        font-weight: 300;
        font-size: 1.458vw;
        line-height: 3.69vh;
        letter-spacing: 0.02em;
        padding-left: 2vw;
      `}
    >
      {date.toLocaleTimeString("en-GB")}
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
