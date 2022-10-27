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
          setPageContent(data.data.data);
        } catch (e) {
          console.log(e);
        }
      };
      fetch();
    }
  }, [router.isReady]);

  console.log(pageContent.id);

  return (
    <Layout>
      <div className={style.manifestoBody} key={pageContent.id}>
        <p>post: {pageContent.id}</p>
      </div>
    </Layout>
  );
};

export default Manifesto;
