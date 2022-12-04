import React, { useState } from "react";
import Link from "next/link";
import style from "../../styles/mobileMenu.module.css";

const MobileMenu = (props) => {
  const [search, setSearch] = useState(false);

  return props.trigger ? (
    <div className={style.mobileMenu}>
      <div className={style.mobileMenuInner}>
        <picture className={style.cornerBTNs}>
          {!search && (
            <button onClick={() => setSearch(true)} className={style.cornerBTN}>
              {/* <picture>
                <img
                  src="/Search.svg"
                  className={style.cornerIcon}
                  alt="Search"
                />
              </picture> */}
            </button>
          )}
          {search && (
            <button
              onClick={() => setSearch(false)}
              className={style.cornerBTN}
            >
              <picture>
                <img
                  src="/HamburgerIcon.svg"
                  className={style.cornerIcon}
                  alt="Search"
                />
              </picture>
            </button>
          )}
          <button
            onClick={() => {
              props.setTrigger(false);
              setSearch(false);
            }}
            className={style.cornerBTN}
          >
            <picture>
              <img
                src="/CloseBtn.svg"
                className={style.cornerIcon}
                alt="close button"
              />
            </picture>
          </button>
        </picture>
        {!search && (
          <div className={style.MenuList}>
            <Link href="/about">
              <p className={style.MobileMenus}> About </p>
            </Link>
            <Link href="/projects">
              <p className={style.MobileMenus}> Projects</p>
            </Link>
            <Link href="/news">
              <p className={style.MobileMenus}> News</p>
            </Link>
            <Link href="/shop">
              <p className={style.MobileMenus}> Shop</p>
            </Link>
            <Link href="/contact">
              <p className={style.MobileMenus}> Contact</p>
            </Link>
          </div>
        )}
        {search && (
          <div className={style.MenuList}>
            {" "}
            <p className={style.MobileMenus}> Search</p>{" "}
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default MobileMenu;
