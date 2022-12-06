import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import { fetchingProjectDeatail } from "../src/APIs/projectBodyAPIs";
import {
  excerptHeader,
  excerptText,
  reRenderDate,
} from "../src/components/commonFn";
import style from "../styles/news.module.css";
import Link from "next/link";

const News = () => {
  const [newsDetails, setNewsDetails] = useState([]);

  const fetch = async () => {
    try {
      const newsData = await fetchingProjectDeatail("news");

      const returnedNewsData = newsData.map((data) => {
        const resetNewsData = {
          id: data.id,
          coverImage: data.attributes.CoverImages.data.attributes.url,
          title: excerptHeader(data.attributes.Title),
          content: excerptText(data.attributes.Content),
          date: reRenderDate(data.attributes.PublishDate),
          pin: data.attributes.Pin,
        };

        return resetNewsData;
      });
      setNewsDetails(returnedNewsData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Layout>
      <div className={style.newsContainer}>
        <div className={style.newsWrapper}>
          {newsDetails.map((News) => {
            if (News.pin) {
              return (
                <div key={News.id}>
                  <Link href={`/news/${News.id}`}>
                    <div className={style.oneNewsContainer}>
                      <picture>
                        <img
                          src={News.coverImage}
                          className={style.newsCoverImage}
                          alt="News cover"
                        />
                      </picture>
                      <div className={style.newsDetail}>
                        <div className={style.contentDetail}>
                          <h2>
                            <picture>
                              <img
                                src="/NK_Pin.png"
                                className={style.pin}
                                alt="pin"
                              />
                            </picture>
                            {News.title}
                          </h2>

                          <p>{News.content}</p>
                        </div>
                        <div className={style.newsDate}>
                          <p>{News.date}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
            return;
          })}
          {newsDetails
            .sort((a, b) => {
              return b.id - a.id;
            })
            .map((News) => {
              if (!News.pin) {
                return (
                  <div key={News.id}>
                    <Link href={`/news/${News.id}`}>
                      <div className={style.oneNewsContainer}>
                        <picture>
                          <img
                            src={News.coverImage}
                            className={style.newsCoverImage}
                            alt="News cover"
                          />
                        </picture>
                        <div className={style.newsDetail}>
                          <div className={style.contentDetail}>
                            <h2>{News.title}</h2>
                            <p>{News.content}</p>
                          </div>
                          <div className={style.newsDate}>
                            <p>{News.date}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </Layout>
  );
};

export default News;
