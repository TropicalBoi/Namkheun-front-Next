import * as React from "react";
import Clock from "./clock";
import Link from "next/link";

import style from "../../styles/footer.module.css"

const Footer = () => {
  return (
    <footer
      className={style.footerContainer}
    >
      <div
        className={style.footerInner}
      >
        <Clock />
        <Link href="/archive" >
          <p className={style.ArchiveFont}>Archive</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
