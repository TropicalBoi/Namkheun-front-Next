import React, { useState } from "react";
import { addHTTP, replaceTags } from "./commonFn";
import style from "../../styles/projects.module.css";
import ReactMarkdown from "react-markdown";

const Popup = (props) => {
  const [thaiText, setThaiText] = useState();

  const handleClose = (input) => {
    props.setTrigger((previousPopup) => ({ ...previousPopup, [input]: false }));
    props.setScroll(false);
  };

  const returnContent = replaceTags(props.textContent);

  const returnContentTh = replaceTags(props.thTextContent);

  return props.trigger[props.projectId] ? (
    <div className={style.popupContainer} key={props.projectId}>
      <div
        className={style.popupClose}
        onClick={() => handleClose(props.projectId)}
      >
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
        onClick={() => handleClose(props.projectId)}
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
          <ReactMarkdown>
            {!thaiText ? returnContent : returnContentTh}
          </ReactMarkdown>
          {props.downloadLink ? (
            <div className={style.downloadArea}>
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
            </div>
          ) : (
            ""
          )}
          {props.logosData ? (
            <div className={style.logosContainer}>
              {props.logosData.map((logo) => {
                return (
                  <picture>
                    <img
                      src={logo.attributes.url}
                      className={style.singleLogo}
                      alt={logo.attributes.name}
                    />
                  </picture>
                );
              })}
            </div>
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

export default Popup;
