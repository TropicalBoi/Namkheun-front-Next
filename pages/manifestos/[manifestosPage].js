import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/components/layout";
import style from "../../styles/manifestos.module.css";

const Manifesto = () => {
  const router = useRouter();

  const [pageContent, setPageContent] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.manifestosPage;
      const fetch = async () => {
        try {
          const data = await axios.get(
            `https://namkheun-back.herokuapp.com/api/manifestos/${id}?populate=*`
          );
          setPageContent(data.data.data.attributes);
        } catch (e) {
          console.log(e);
        }
      };
      fetch();
    }
  }, [router.isReady]);

  console.log(pageContent.Title);

  return (
    <Layout>
      <div className={style.manifestoBody} key={pageContent.Title}>
        <p>post: {pageContent.Title}</p>
      </div>
    </Layout>
  );
};

export default Manifesto;
