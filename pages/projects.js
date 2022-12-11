import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import style from "../styles/projects.module.css";
import {
  fetchingProjects,
  fetchingProjectDeatail,
} from "../src/APIs/projectBodyAPIs";
import { defaultString } from "../src/components/commonFn";
import RenderProjectBody from "../src/components/projectBody";
import PopUp from "../src/components/projectPopup";
import Link from "next/link";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [popup, setPopup] = useState({});

  const [popupState, setPopupState] = useState(false);

  const [popupSlide, setPopupSlide] = useState(false);

  const handleClick = (input) => {
    setPopup((previousPopup) => ({ ...previousPopup, [input]: true }));
    setPopupSlide(true);
    setPopupState(true);
  };

  const fetchProjects = async () => {
    const projectData = await fetchingProjects();

    setProjects(projectData);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <div
        className={
          popupState ? style.projectsContainerNoScroll : style.projectsContainer
        }
      >
        <div className={style.projectWrapper}>
          {projects.map((Project) => {
            if (Project.attributes.ProjectName === "News") {
              return;
            } else if (Project.attributes.Pin) {
              return (
                <div className={style.projectContainer} key={Project.id}>
                  <div
                    className={style.projectHeader}
                    key={Project.attributes.ProjectName}
                    id={Project.attributes.ProjectName.toLowerCase()}
                  >
                    <div className={style.pinProject}>
                      <picture>
                        <img
                          src="/NK_Pin.png"
                          className={style.pin}
                          alt="pin"
                        />
                      </picture>
                      <p className={style.projectName}>
                        {Project.attributes.ProjectName}
                      </p>
                    </div>

                    <Link
                      href={`/projects/#${Project.attributes.ProjectName.toLowerCase()}`}
                    >
                      <picture>
                        <img
                          src="/NK_Icon-dungo.svg"
                          className={style.dungoIcon}
                          alt="about"
                          onClick={() =>
                            setTimeout(() => handleClick(Project.id), 500)
                          }
                        />
                      </picture>
                    </Link>
                  </div>

                  <PopUp
                    trigger={popup}
                    setTrigger={setPopup}
                    setScroll={setPopupState}
                    slide={popupSlide}
                    setSlide={setPopupSlide}
                    projectId={Project.id}
                    textContent={Project.attributes.Description}
                    thTextContent={Project.attributes.ThDescription}
                    downloadLink={Project.attributes.DownloadLink}
                    logosData={Project.attributes.Logos.data}
                  />

                  <RenderProjectBody
                    projectName={Project.attributes.ProjectName}
                  />
                </div>
              );
            }
            return;
          })}
          {projects
            .sort((a, b) => {
              return b.id - a.id;
            })
            .map((Project) => {
              if (Project.attributes.ProjectName === "News") {
                return;
              } else if (!Project.attributes.Pin) {
                return (
                  <div className={style.projectContainer} key={Project.id}>
                    <div
                      className={style.projectHeader}
                      key={Project.attributes.ProjectName}
                      id={Project.attributes.ProjectName.toLowerCase()}
                    >
                      <p className={style.projectName}>
                        {Project.attributes.ProjectName}{" "}
                      </p>

                      <Link
                        href={`/projects/#${Project.attributes.ProjectName.toLowerCase()}`}
                      >
                        <picture>
                          <img
                            src="/NK_Icon-dungo.svg"
                            className={style.dungoIcon}
                            alt="about"
                            onClick={() =>
                              setTimeout(() => handleClick(Project.id), 500)
                            }
                          />
                        </picture>
                      </Link>
                    </div>

                    <PopUp
                      trigger={popup}
                      setTrigger={setPopup}
                      setScroll={setPopupState}
                      slide={popupSlide}
                      setSlide={setPopupSlide}
                      projectId={Project.id}
                      textContent={Project.attributes.Description}
                      thTextContent={Project.attributes.ThDescription}
                      downloadLink={Project.attributes.DownloadLink}
                      logosData={Project.attributes.Logos.data}
                    />

                    <RenderProjectBody
                      projectName={Project.attributes.ProjectName}
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
