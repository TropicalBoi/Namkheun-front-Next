import * as React from "react";
// import Clock from "./clock";
import Link from "next/link";
import { css } from "@emotion/css";

const Footer = () => {
  return (
    <footer
      className={css`
        position: absolute;
        bottom: 0;
        width: 100vw;
        height: 12vh;
        background-image: linear-gradient(
          to top,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0)
        );
        z-index: 100;
      `}
    >
      <div
        className={css`
          position: absolute;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;
          width: 100vw;
          bottom: 1vh;
        `}
      >
        <Clock />
        <Link
          href="/archive"
          className={css`
            position: relative;
            width: fit-content;
            height: fit-content;
            font-family: moderat-meduim;
            font-style: normal;
            font-weight: 500;
            font-size: 3.125vw;
            letter-spacing: 0.02em;
            padding-right: 2vw;
          `}
        >
          Archive
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
