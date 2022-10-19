import React from "react";
import Layout from "../src/components/layout";
import style from "../styles/news.module.css";

const News = () => {
  return (
    <Layout>
      <div className={style.newsContainer}></div>
    </Layout>
  );
};

export default News;
