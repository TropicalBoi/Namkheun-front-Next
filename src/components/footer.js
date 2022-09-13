import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import style from "../../styles/footer.module.css";

const DynamicComponentClock = dynamic(() => import("./clock"), {
  ssr: false,
});

const Footer = () => {

 


  return (
    <footer className={style.footerContainer}>
      <div className={style.footerInner}>
        <DynamicComponentClock />
        <Link href="/archive">
          <p className={style.ArchiveFont}>Archive</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
