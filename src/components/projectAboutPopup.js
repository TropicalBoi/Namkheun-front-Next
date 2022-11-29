import React, { useState } from "react";
import { addHTTP, defaultString, replaceTags } from "./commonFn";
import style from "../../styles/projects.module.css";

const AboutPopUp = (props) => {
  const [thaiText, setThaiText] = useState();

  const returnContent = replaceTags(defaultString(props.textContent));

  const returnContentTh = replaceTags(defaultString(props.thTextContent));

  const clean = { __html: returnContent };

  const cleanTh = { __html: returnContentTh };

  return props.trigger ? (
    <div className={style.popupContainer}>
      <div className={style.popupClose} onClick={() => props.setTrigger(false)}>
        <picture>
          <img
            src="/NK_Icon-close.svg"
            className={style.closeIcon}
            alt="close"
          />
        </picture>
      </div>
      <div
        className={style.popupOuter}
        onClick={() => props.setTrigger(false)}
      ></div>
      <div className={style.popupInner}>
        <div className={style.popupHeader}>
          <div className={style.popupLanguageSection}>
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
        <div className={style.popupContent}>
          <p dangerouslySetInnerHTML={!thaiText ? clean : cleanTh} />
          {props.downloadLink ? (
            <a
              target="_blank"
              href={addHTTP(props.downloadLink)}
              rel="noopener noreferrer"
            >
              <div className={style.popupPDF}>
                <p>PDF</p>
                <picture>
                  <img
                    src="/NK_Icon-download.svg"
                    className={style.popupDownloadIcon}
                    alt="download"
                  />
                </picture>
              </div>
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AboutPopUp;
