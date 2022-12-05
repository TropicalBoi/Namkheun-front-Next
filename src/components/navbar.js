import React, { useState } from "react";
import Link from "next/link";
import MobileMenu from "./mobileMenu";

import style from "../../styles/navbar.module.css";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [fade, setFade] = useState(false);

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
          <Link href="/news">
            <p className={style.MenuLink}> News</p>
          </Link>
          <Link href="/shop">
            <p className={style.MenuLink}> Shop</p>
          </Link>
          <Link href="/contact">
            <p className={style.MenuLink}> Contact</p>
          </Link>
        </div>
      </div>
      {!mobileMenu && (
        <>
          {/* <picture>
            <img src="/Search.svg" className={style.SearchIcon} alt="search" />
          </picture> */}
          <button
            className={style.HamburgerButton}
            onClick={() => {
              setFade(true);
              setMobileMenu(true);
            }}
          >
            <picture>
              <img
                src="/HamburgerIcon.svg"
                className={style.HamburgerIcon}
                alt="search"
              />
            </picture>
          </button>
        </>
      )}
      <MobileMenu
        trigger={mobileMenu}
        setTrigger={setMobileMenu}
        fade={fade}
        setFade={setFade}
      />
    </nav>
  );
};

export default Navbar;
