import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/components/layout";
import style from "../../styles/innerProjects.module.css";
import cn from "classnames";
import {
  defaultString,
  replaceTags,
  reRenderDate,
  addHTTP,
} from "../../src/components/commonFn";
import ReactMarkdown from "react-markdown";

const OneNews = () => {
  const router = useRouter();

  const [content, setContent] = useState([]);

  const [thaiText, setThaiText] = useState();

  const [thaiOnly, setThaiOnly] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const fetch = async () => {
        try {
          const id = router.query.newsPage;

          let data = null;

          try {
            data = await axios.get(
              `https://namkheun-back.herokuapp.com/api/news/${id}?populate=*`
            );
          } catch (err) {
            if (err.response.status == 404) {
              router.push("/404");
            }
          }

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
            contentTH: defaultString(rawContentData.ThContent),
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
  }, [router, router.isReady]);

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

            <p>
              {!thaiText
                ? "Published by Namkheun Collective on"
                : "เผยแพร่โดย น้ำขึ้นคอลเลคทีฟ"}
              : {content.publishDate}
            </p>
          </div>
          <div className={style.manifestoDetail}>
            <div className={style.authorYear}>
              <div className={style.author}>
                {content.author ? (
                  <p className={style.authorKey}>
                    {!thaiText ? "Author" : "ผู้เขียน"}
                  </p>
                ) : (
                  ""
                )}
                {!thaiText ? (
                  <p>{content.author}</p>
                ) : (
                  <p>{content.authorTH}</p>
                )}
              </div>
              <div className={style.year}>
                {content.year ? (
                  <p className={style.yearKey}>{!thaiText ? "Year" : "ปี"}</p>
                ) : (
                  ""
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
          <ReactMarkdown
            className={cn({
              [style.textLeft]: content.textAlign === "Left",
              [style.textCenter]: content.textAlign === "Center",
              [style.textRight]: content.textAlign === "Right",
            })}
          >
            {!thaiText ? content.content : content.contentTH}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export default OneNews;
