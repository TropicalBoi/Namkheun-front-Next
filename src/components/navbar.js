import * as React from "react";
import Link from "next/link";

import style from "../../styles/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.navbarContainer}>
        <Link href="/">
          <p className={style.HomeLink}> Namkheun Collective </p>
        </Link>
        <div className={style.navbarMenu}>
          <Link href="/about">
            <p className={style.MenuLink}> About </p>
          </Link>
          <Link href="/projects">
            <p className={style.MenuLink}> Projects</p>
          </Link>
          <Link href="/projects">
            <p className={style.MenuLink}> News</p>
          </Link>
          <Link href="/projects">
            <p className={style.MenuLink}> Shop</p>
          </Link>
          <Link href="/contact">
            <p className={style.MenuLink}> Contact</p>
          </Link>
        </div>
      </div>
      <picture>
        <img src="/Search.svg" className={style.SearchIcon} alt="search" />
        <img
          src="/HamburgerIcon.svg"
          className={style.HamburgerIcon}
          alt="search"
        />
      </picture>
    </nav>
  );
};

export default Navbar;
