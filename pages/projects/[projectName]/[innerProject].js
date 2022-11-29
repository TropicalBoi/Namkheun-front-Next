import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../../src/components/layout";
import style from "../../../styles/manifestos.module.css";
import cn from "classnames";
import {
  defaultString,
  replaceTags,
  reRenderDate,
  addHTTP,
} from "../../../src/components/commonFn";

const Manifesto = () => {
  const router = useRouter();

  const [content, setContent] = useState([]);

  const [thaiText, setThaiText] = useState();

  const [thaiOnly, setThaiOnly] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const fetch = async () => {
        try {
          const projectName = router.query.projectName;
          const id = router.query.innerProject;

          const data = await axios.get(
            `https://namkheun-back.herokuapp.com/api/${projectName}/${id}?populate=*`
          );

          const rawContentData = data.data.data.attributes;

          if (rawContentData.ThContent) {
            setThaiOnly(false);
          }

          const headlineImg = (input) => {
            if (!input.Images) {
              return input.CoverImages.data.attributes.url;
            }
            return input.Images.data.attributes.url;
          };

          const contentData = {
            title: rawContentData.Title,
            titleTH: rawContentData.ThTitle,
            description: rawContentData.Description,
            descriptionTH: rawContentData.ThDescription,
            publishDate: reRenderDate(rawContentData.PublishDate),
            author: rawContentData.Author,
            authorTH: rawContentData.ThAuthor,
            year: rawContentData.Year,
            img: headlineImg(rawContentData),
            content: replaceTags(rawContentData.Content),
            contentTH: replaceTags(defaultString(rawContentData.ThContent)),
            textAlign: rawContentData.TextAlign,
            downloadLink: defaultString(rawContentData.DownloadLink),
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
                {content.author ? <p>Author</p> : ""}
                {content.year ? <p>Year</p> : ""}
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
            {!thaiOnly ? (
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
            ) : (
              ""
            )}
          </div>
        </div>

        {content.downloadLink ? (
          <a
            target="_blank"
            href={addHTTP(content.downloadLink)}
            rel="noopener noreferrer"
          >
            <div className={style.manifestoPDF}>
              <p>PDF</p>
              <picture>
                <img
                  src="/NK_Icon-download.svg"
                  className={style.manifestoDownloadIcon}
                  alt="download"
                />
              </picture>
            </div>
          </a>
        ) : (
          ""
        )}
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
