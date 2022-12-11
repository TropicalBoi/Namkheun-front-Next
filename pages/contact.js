import React, { useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../src/components/layout";
import style from "../styles/contact.module.css";

const Contact = () => {
  const ref = useRef(null);

  const router = useRouter();

  const onFormSubmit = (e) => {
    const form = document.getElementById("submit-form");
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      router.push("/done");
    });
  };

  return (
    <Layout>
      <div className={style.contactWrapper}>
        <div className={style.contactContainer}>
          <div className={style.signupSection}>
            <form
              ref={ref}
              id="submit-form"
              method="POST"
              action="https://script.google.com/macros/s/AKfycbwuVHuAWxprRIQAMibr5ICRymdVlhcZU7RlQgTczZIKVlkpEw602Fs3m6drZjA_fA_bsA/exec"
              onSubmit={onFormSubmit}
            >
              <p>
                Sign up for<br></br>
                our mailing list:<br></br>
                <input
                  name="Email"
                  type="email"
                  className={style.inputSection}
                  autoComplete="off"
                  placeholder="Your email here"
                  required
                />
                <br></br>
                <input
                  className={style.summitSection}
                  type="submit"
                  value="Subscribe"
                />
              </p>
            </form>
          </div>
          <div className={style.socialUpdate}>
            <p>
              For regular updates, follow us on
              <br />
              <br />
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
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
