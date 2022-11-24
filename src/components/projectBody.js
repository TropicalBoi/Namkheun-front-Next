import React, { useState, useEffect } from "react";
import { fetchingProjectDeatail } from "../APIs/projectBodyAPIs";
import style from "../../styles/projects.module.css";
import Link from "next/link";

const RenderProjectBody = (props) => {
  const [projectItems, SetProjectItems] = useState(<></>);

  const fetch = async () => {
    try {
      const manifestoData = await fetchingProjectDeatail(props.projectName);

      const findImgSize = (h, w) => {
        if (h < w) {
          return true;
        } else {
          return false;
        }
      };

      const renderProjectBody = (inputValue) => {
        if (typeof inputValue === "object" && !Array.isArray(inputValue)) {
          return (
            <div className={style.projectBodyFrost}>
              <picture>
                <img
                  src={inputValue.attributes.CoverImages.data.attributes.url}
                  className={style.frostsCoverImg}
                  alt={`${props.projectName}`}
                />
              </picture>
            </div>
          );
        } else if (Array.isArray(inputValue)) {
          return (
            <div className={style.projectBody}>
              {inputValue.map((items) => {
                return (
                  <div key={items.id}>
                    <Link
                      href={`/${props.projectName.toLowerCase()}/${items.id}`}
                    >
                      <div
                        key={items.attributes.CoverImages.data.attributes.url}
                      >
                        <picture>
                          <img
                            src={
                              items.attributes.CoverImages.data.attributes.url
                            }
                            className={
                              findImgSize(
                                items.attributes.CoverImages.data.attributes
                                  .height,
                                items.attributes.CoverImages.data.attributes
                                  .width
                              )
                                ? style.notesCoverImg
                                : style.manifestosCoverImg
                            }
                            alt={`${items.attributes.Title}`}
                          />
                        </picture>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        } else {
          return <></>;
        }
      };

      const outputBody = renderProjectBody(manifestoData);

      SetProjectItems(outputBody);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return <>{projectItems}</>;
};

export default RenderProjectBody;
