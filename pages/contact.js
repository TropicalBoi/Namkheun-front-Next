import React from "react";
import { css } from "@emotion/css";
import Layout from "../src/components/layout";

const contact = () => {
  return (
    <Layout>
    <div
      className={css`
        width: 100vw;
        height: 90vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        font-family: moderat-meduim;
        font-style: normal;
        font-weight: 500;
        font-size: 3.125vw;
        letter-spacing: 0.02em;
        padding-top: 8vh;
      `}
    >
      <p
        className={css`
          width: 23.02vw;
          height: 32.2vh;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        Sign up for<br></br>
        our mailing list:<br></br>
        <input
          className={css`
            width: 41.66vw;
            border: none;
            color: #c4c4c4;
            font-family: moderat-meduim;
            font-style: normal;
            font-weight: 500;
            font-size: 3.125vw;
            letter-spacing: 0.02em;
            text-align: center;
          `}
          type="text"
          placeholder="Your email here"
        />
        <br></br>
        <input
          className={css`
            border: none;
            color: #000000;
            font-family: moderat-meduim;
            font-style: normal;
            font-weight: 500;
            font-size: 3.125vw;
            letter-spacing: 0.02em;
            text-align: center;
            background-color: transparent;
          `}
          type="submit"
          value="Subscibe"
        />
      </p>
      <p
        className={css`
          position: absolutel;
          top: 17.7vh;
          left: 50vw;
          width: 39.89vw;
          height: 60.82vh;
          line-height: 6.86vh;
        `}
      >
        For regular updates, follow us on
        <br></br>
        <br></br>
        IG{" "}
        <a
          href="https://www.instagram.com/namkheun/"
          target="_blank"
          without
          rel="noreferrer"
        >
          @namkheun
        </a>
        <br></br>
        Twitter{" "}
        <a
          href="https://twitter.com/namkheun"
          target="_blank"
          without
          rel="noreferrer"
        >
          @namkheun
        </a>
        <br></br>
        FB{" "}
        <a
          href="https://www.facebook.com/namkheun"
          target="_blank"
          without
          rel="noreferrer"
        >
          <span>น้ำขึ้น</span> Namkheun
        </a>
        <br></br>
        <br></br>
        Alternatively, write to us at collective@namkheun.com
      </p>
    </div>
    </Layout>
  );
};

export default contact;
