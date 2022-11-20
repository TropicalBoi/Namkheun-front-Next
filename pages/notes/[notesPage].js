import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/components/layout";
import style from "../../styles/manifestos.module.css";
import cn from "classnames";

const Note = () => {
  const router = useRouter();

  const [pageContent, setPageContent] = useState([]);
  const [pageImage, setPageImage] = useState();
  const [renderRichtext, setRenderRichtext] = useState([]);
  const [renderDate, setRenderDate] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.notesPage;
      const fetch = async () => {
        try {
          const data = await axios.get(
            `https://namkheun-back.herokuapp.com/api/notes/${id}?populate=*`
          );
          setPageContent(data.data.data.attributes);
          setPageImage(
            data.data.data.attributes.CoverImages.data.attributes.url
          );
          const replaced = data.data.data.attributes.Content.replace(
            /\n/g,
            "<br />"
          )
            .replace(/\*{2}(.*?)\*{2}/g, "<b>$1</b>")
            .replace(/_(.*?)_/g, "<i>$1</i>");
          setRenderRichtext(replaced);
          const reRenderDate = data.data.data.attributes.PublishDate.replace(
            /([\w ]+)-([\w ]+)-([\w ]+)/g,
            "$3/$2/$1"
          );
          setRenderDate(reRenderDate);
        } catch (e) {
          console.log(e);
        }
      };
      fetch();
    }
  }, [router.isReady]);

  const clean = { __html: renderRichtext };

  return (
    <Layout>
      <div className={style.manifestoBody} key={pageContent.Title}>
        <div className={style.manifestoHeader}>
          <div className={style.manifestoTitle}>
            <p>{pageContent.Title}</p>
          </div>
          <div className={style.manifestoDescription}>
            {/* <p>{pageContent.Description}</p> */}
            <p>Published by Namkheun Collective on: {renderDate}</p>
          </div>
          <div className={style.manifestoDetail}>
            <div className={style.authorYear}>
              <div className={style.authorYearKey}>
                <p>Author</p>
                <p>Year</p>
              </div>
              <div className={style.authorYearValue}>
                <p>{pageContent.Author}</p>
                <p>{pageContent.Year}</p>
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
              src={pageImage}
              className={style.manifestoPageImage}
              alt="page image"
            />
          </picture>
        </div>
        <div className={style.manifestoContent}>
          <p
            className={cn({
              [style.textLeft]: pageContent.TextAlign === "Left",
              [style.textCenter]: pageContent.TextAlign === "Center",
              [style.textRight]: pageContent.TextAlign === "Right",
            })}
            dangerouslySetInnerHTML={clean}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Note;
