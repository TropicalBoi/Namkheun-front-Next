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
        <title>Namkheun Collective</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
