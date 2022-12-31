import * as React from "react";

import style from "../../styles/layout.module.css";
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className={style.layout}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" />
        <title>Namkheun Collective</title>
        <link rel="icon" href="/NK_favicon.png" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
