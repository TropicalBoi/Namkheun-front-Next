import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/components/layout";
import style from "../../styles/manifestos.module.css";
import cn from "classnames";
import { replaceTags, reRenderDate } from "../../src/components/commonFn";

const Manifesto = () => {
  const router = useRouter();

  const [content, setContent] = useState([]);

  const [thaiText, setThaiText] = useState();

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.manifestosPage;
      const fetch = async () => {
        try {
          const data = await axios.get(
            `https://namkheun-back.herokuapp.com/api/manifestos/${id}?populate=*`
          );

          const rawContentData = data.data.data.attributes;

          const contentData = {
            title: rawContentData.Title,
            titleTH: rawContentData.ThTitle,
            description: rawContentData.Description,
            descriptionTH: rawContentData.ThDescription,
            publishDate: reRenderDate(rawContentData.PublishDate),
            author: rawContentData.Author,
            authorTH: rawContentData.ThAuthor,
            year: rawContentData.Year,
            img: rawContentData.Images.data.attributes.url,
            content: replaceTags(rawContentData.Content),
            contentTH: replaceTags(rawContentData.ThContent),
            textAlign: rawContentData.TextAlign,
          };

          setContent(contentData);
        } catch (e) {
          console.log(e);
        }
      };
      fetch();
    }
  }, [router.isReady]);

  const clean = { __html: content.content };

  const cleanTh = { __html: content.contentTH };

  return (
    <Layout>
      <div className={style.manifestoBody} key={content.title}>
        <div className={style.manifestoHeader}>
          <div className={style.manifestoTitle}>
            {!thaiText ? <p>{content.title}</p> : <p>{content.titleTH}</p>}
          </div>
          <div className={style.manifestoDescription}>
            {!thaiText ? (
              <p>{content.description}</p>
            ) : (
              <p>{content.descriptionTH}</p>
            )}

            <p>Published by Namkheun Collective on: {content.publishDate}</p>
          </div>
          <div className={style.manifestoDetail}>
            <div className={style.authorYear}>
              <div className={style.authorYearKey}>
                <p>Author</p>
                <p>Year</p>
              </div>
              <div className={style.authorYearValue}>
                {!thaiText ? (
                  <p>{content.author}</p>
                ) : (
                  <p>{content.authorTH}</p>
                )}

                <p>{content.year}</p>
              </div>
            </div>
            <div className={style.languageSection}>
              {thaiText && (
                <p
                  className={style.languageOnHover}
                  onClick={() => setThaiText(!thaiText)}
                >
                  EN
                </p>
              )}
              {!thaiText && <p className={style.languageOnActive}>EN</p>}
              <p>/</p>
              {!thaiText && (
                <p
                  className={style.languageOnHover}
                  onClick={() => setThaiText(!thaiText)}
                >
                  TH
                </p>
              )}
              {thaiText && <p className={style.languageOnActive}>TH</p>}
            </div>
          </div>
        </div>
        <div className={style.manifestoPDF}>
          <p>PDF</p>
        </div>
        <div className={style.manifestoImg}>
          <picture>
            <img
              src={content.img}
              className={style.manifestoPageImage}
              alt="page image"
            />
          </picture>
        </div>
        <div className={style.manifestoContent}>
          <p
            className={cn({
              [style.textLeft]: content.textAlign === "Left",
              [style.textCenter]: content.textAlign === "Center",
              [style.textRight]: content.textAlign === "Right",
            })}
            dangerouslySetInnerHTML={!thaiText ? clean : cleanTh}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Manifesto;
