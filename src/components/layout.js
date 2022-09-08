import * as React from "react";
import { css } from "@emotion/css";
import Navbar from "./navbar";
import Footer from "./footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
      `}
    >
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
