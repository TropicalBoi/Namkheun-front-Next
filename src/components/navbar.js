import * as React from "react";
import Link from "next/link";

// import searchIcon from "../images/SearchIcon.png";
import style from "../../styles/navbar.module.css"

const Navbar = () => {
  return (
    <nav
      className={style.navbar}
    >
      <div
        className={style.navbarContainer}
      >
        <Link href="/">Namkheun Collective</Link>
        <div
          className={style.navbarMenu}
        >
          <Link href="/about" >
            <p className={style.MenuLink}> About </p>
            
          </Link>
          <Link href="/projects" >
            <p className={style.MenuLink}>    Projects</p>
         
          </Link>
          <Link href="/contact" >
            <p className={style.MenuLink}> Contact</p>
            
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
