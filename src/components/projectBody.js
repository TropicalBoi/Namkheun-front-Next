import React, { useState, useEffect, useRef } from "react";
import { fetchingProjectDeatail } from "../APIs/projectBodyAPIs";
import style from "../../styles/projects.module.css";
import Link from "next/link";

const RenderProjectBody = (props) => {
  const targetRef = useRef();
  const [projectItems, setProjectItems] = useState();

  const [width, setWidth] = useState(0);

  const [dimensions, setDimensions] = useState(1);

  const [divAnimation, setDivAnimation] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (props.projectName === "News") {
        return;
      }

      try {
        const returnedData = await fetchingProjectDeatail(props.projectName);

        setProjectItems(returnedData);
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, [props.projectName]);

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef.current]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      console.log("updating height");
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    console.log(props.projectName, dimensions, width);
    if (dimensions >= width) {
      setDivAnimation(true);
    } else {
      setDivAnimation(false);
    }
  }, [dimensions, width, props.projectName]);

  if (typeof projectItems === "object" && !Array.isArray(projectItems)) {
    return (
      <div className={style.projectBodyFrost}>
        <picture>
          <img
            src={projectItems.attributes.CoverImages.data.attributes.url}
            className={style.coverImgFrost}
            alt={`${props.projectName}`}
          />
        </picture>
      </div>
    );
  } else if (Array.isArray(projectItems)) {
    return (
      <div className={style.projectBody}>
        <div
          className={
            divAnimation ? style.projectBodyInnerMove : style.projectBodyInner
          }
          ref={targetRef}
        >
          {projectItems.map((items) => {
            return (
              <div key={items.id}>
                <Link
                  href={`/projects/${props.projectName.toLowerCase()}/${
                    items.id
                  }`}
                >
                  <div key={items.attributes.CoverImages.data.attributes.url}>
                    <picture>
                      <img
                        src={items.attributes.CoverImages.data.attributes.url}
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
      </div>
    );
  } else {
    return <></>;
  }
};

export default RenderProjectBody;
