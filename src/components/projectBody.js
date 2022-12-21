import React, { useState, useEffect } from "react";
import { fetchingProjectDeatail } from "../APIs/projectBodyAPIs";
import style from "../../styles/projects.module.css";
import Link from "next/link";

const RenderProjectBody = (props) => {
  const [projectItems, setProjectItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (props.projectName === "News") {
        return;
      }

      try {
        const returnedData = await fetchingProjectDeatail(props.projectName);

        const renderProjectBody = (inputValue) => {
          if (typeof inputValue === "object" && !Array.isArray(inputValue)) {
            return (
              <div className={style.projectBodyFrost}>
                <picture>
                  <img
                    src={inputValue.attributes.CoverImages.data.attributes.url}
                    className={style.coverImgFrost}
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

        setProjectItems(outputBody);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [props.projectName]);

  return <>{projectItems}</>;
};

export default RenderProjectBody;
