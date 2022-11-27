import React, { useState, useEffect } from "react";
import { fetchingProjectDeatail } from "../APIs/projectBodyAPIs";
import style from "../../styles/projects.module.css";
import Link from "next/link";

const RenderProjectBody = (props) => {
  const [projectItems, SetProjectItems] = useState(<></>);

  const fetch = async () => {
    if (props.projectName === "News") {
      return;
    }

    try {
      const returnedData = await fetchingProjectDeatail(props.projectName);

      // const findImgSize = (h, w) => {
      //   if (h < w) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // };

      const renderProjectBody = (inputValue) => {
        if (typeof inputValue === "object" && !Array.isArray(inputValue)) {
          return (
            <div className={style.projectBodyFrost}>
              <picture>
                <img
                  src={inputValue.attributes.CoverImages.data.attributes.url}
                  className={style.coverImg}
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
                      href={`/projects/${props.projectName.toLowerCase()}/${
                        items.id
                      }`}
                    >
                      <div
                        key={items.attributes.CoverImages.data.attributes.url}
                      >
                        <picture>
                          <img
                            src={
                              items.attributes.CoverImages.data.attributes.url
                            }
                            className={style.coverImg}
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

      const outputBody = renderProjectBody(returnedData);

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
