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

  const [engText, setEngText] = useState();

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

          if (rawContentData.Content_EN) {
            setThaiOnly(false);
          }

          const headlineImg = (input) => {
            if (!input.Images) {
              return input.CoverImages.data.attributes.url;
            }
            return input.Images.data.attributes.url;
          };

          const contentData = {
            title: rawContentData.Title_EN,
            titleTH: rawContentData.Title_TH,
            description: rawContentData.Description_EN,
            descriptionTH: rawContentData.Description_TH,
            publishDate: reRenderDate(rawContentData.PublishDate),
            author: rawContentData.Author_EN,
            authorTH: rawContentData.Author_TH,
            year: rawContentData.Year,
            img: headlineImg(rawContentData),
            content: replaceTags(rawContentData.Content_EN),
            contentTH: replaceTags(defaultString(rawContentData.Content_TH)),
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
            {!engText ? <h2>{content.titleTH}</h2> : <h2>{content.title}</h2>}
            {!thaiOnly ? (
              <div className={style.languageSection}>
                {!engText && (
                  <p
                    className={style.languageOnHover}
                    onClick={() => setEngText(!engText)}
                  >
                    EN
                  </p>
                )}
                {engText && <p className={style.languageOnActive}>EN</p>}
                <p>&nbsp;|&nbsp;</p>
                {engText && (
                  <p
                    className={style.languageOnHover}
                    onClick={() => setEngText(!engText)}
                  >
                    TH
                  </p>
                )}
                {!engText && <p className={style.languageOnActive}>TH</p>}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={style.descriptionAndDetail}>
            <div className={style.manifestoDescription}>
              {!engText ? (
                <p>{content.descriptionTH}</p>
              ) : (
                <p>{content.description}</p>
              )}

              <p>
                {!engText
                  ? "เผยแพร่โดย น้ำขึ้นคอลเลคทีฟ"
                  : "Published by Namkheun Collective on"}
                : {content.publishDate}
              </p>
            </div>
            <div className={style.manifestoDetail}>
              {!engText ? (
                <div className={style.authorYear}>
                  <div className={style.author}>
                    {content.author ? <h2>ผู้เขียน</h2> : ""}

                    <p>{content.authorTH}</p>
                  </div>
                  <div className={style.year}>
                    {content.year ? <h2>ปี</h2> : ""}
                    <p>{content.year}</p>
                  </div>
                </div>
              ) : (
                <div className={style.authorYear}>
                  <div className={style.author}>
                    {content.author ? <h2>Author</h2> : ""}

                    <p>{content.author}</p>
                  </div>
                  <div className={style.year}>
                    {content.year ? <h2>Year</h2> : ""}
                    <p>{content.year}</p>
                  </div>
                </div>
              )}
            </div>
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
            {!engText ? content.contentTH : content.content}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export default OneNews;
