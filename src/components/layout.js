import * as React from "react";
import { css } from "@emotion/react";
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div
      css={css`
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
