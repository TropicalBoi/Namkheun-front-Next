import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../src/components/layout";
import style from "../styles/done.module.css";

const FormDone = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/contact");
    }, 5000);
  }, [router]);

  return (
    <Layout>
      <div className={style.doneBody}>
        <picture>
          <img src="/NK_Mail.png" className={style.doneIcon} alt="Mail" />
        </picture>
        <h2>Thanks for your subscription!</h2>
        <p> You’ve been added to our list and will hear from us soon!</p>
      </div>
    </Layout>
  );
};

export default FormDone;
