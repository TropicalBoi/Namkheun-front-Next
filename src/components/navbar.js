import * as React from "react";
import Link from "next/link";
import { css } from "@emotion/css";
// import searchIcon from "../images/SearchIcon.png";

const Navbar = () => {
  return (
    <nav
      className={css`
          position: absolute;
          top: 0;
          width: 100%;
          height: 25vh;
          font-family: moderat-meduim;
          font-style: normalว
          font-weight: 500;
          font-size: 3.125vw;
          letter-spacing: 0.02em;
          line-height: 6.33vh;
          background-image: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0));
          z-index: 100;
        `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: absolute;
          top: 2.9vh;
          left: 1.82vw;
        `}
      >
        <Link href="/">Namkheun Collective</Link>
        <div
          className={css`
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
          `}
        >
          <Link href="/about" className="MenuLink">
            About
          </Link>
          <Link href="/projects" className="MenuLink">
            Projects
          </Link>
          <Link href="/contact" className="MenuLink">
            Contact
          </Link>
        </div>
      </div>
      {/* <img
        src={searchIcon}
        css={css`
          position: absolute;
          width: 2.6vw;
          height: auto;
          top: 3.69vh;
          right: 1.82vw;
        `}
        alt="search"
      /> */}
    </nav>
  );
};

export default Navbar;
