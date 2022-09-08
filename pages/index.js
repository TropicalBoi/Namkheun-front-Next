import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/layout";
import { css } from "@emotion/react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>
        <div
          css={css`
            width: 100vw;
            height: 100vh;
            background-color: white;
          `}
        ></div>
      </Layout>
    </div>
  );
}
