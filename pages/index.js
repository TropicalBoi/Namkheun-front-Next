import Layout from "../src/components/layout";
import { css } from "@emotion/css";

export default function Home() {
  return (
    <Layout>
      <div
        className={css`
          width: 100vw;
          height: 100vh;
          background-color: white;
        `}
      ></div>
    </Layout>
  );
}
