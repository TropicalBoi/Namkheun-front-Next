import React from "react";
import Layout from "../src/components/layout";
import style from "../styles/contact.module.css";

const Contact = () => {
  return (
    <Layout>
      <div className={style.contactContainer}>
        <p className={style.signupSection}>
          Sign up for<br></br>
          our mailing list:<br></br>
          <input
            className={style.inputSection}
            type="text"
            placeholder="Your email here"
          />
          <br></br>
          <input
            className={style.summitSection}
            type="submit"
            value="Subscribe"
          />
        </p>
        <p className={style.socialUpdate}>
          For regular updates, follow us on
          <br></br>
          <br></br>
          IG{" "}
          <a
            href="https://www.instagram.com/namkheun/"
            target="_blank"
            rel="noreferrer"
          >
            @namkheun
          </a>
          <br></br>
          Twitter{" "}
          <a
            href="https://twitter.com/namkheun"
            target="_blank"
            rel="noreferrer"
          >
            @namkheun
          </a>
          <br></br>
          FB{" "}
          <a
            href="https://www.facebook.com/namkheun"
            target="_blank"
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

export default Contact;
