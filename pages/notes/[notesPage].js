import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/components/layout";
import style from "../../styles/manifestos.module.css";
import cn from "classnames";
import { replaceTags, reRenderDate } from "../../src/components/commonFn";

const Note = () => {
  const router = useRouter();

  const [content, setContent] = useState({});

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.notesPage;
      const fetch = async () => {
        try {
          const data = await axios.get(
            `https://namkheun-back.herokuapp.com/api/notes/${id}?populate=*`
          );

          const rawContentData = data.data.data.attributes;

          const contentData = {
            title: rawContentData.Title,
            publishDate: reRenderDate(rawContentData.PublishDate),
            author: rawContentData.Author,
            img: rawContentData.CoverImages.data.attributes.url,
            content: replaceTags(rawContentData.Content),
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

  return (
    <Layout>
      <div className={style.manifestoBody}>
        <div className={style.manifestoHeader}>
          <div className={style.manifestoTitle} key={content.title}>
            <p>{content.title}</p>
          </div>
          <div className={style.manifestoDescription}>
            <p>Published by Namkheun Collective on: {content.publishDate}</p>
          </div>
          <div className={style.manifestoDetail}>
            <div className={style.authorYear}>
              <div className={style.authorYearKey}>
                <p>Author</p>
              </div>
              <div className={style.authorYearValue}>
                <p>{content.author}</p>
              </div>
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
            dangerouslySetInnerHTML={clean}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Note;
