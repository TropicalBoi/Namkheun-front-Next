import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import style from "../styles/projects.module.css";
import {
  fetchingProjects,
  fetchingProjectDeatail,
} from "../src/APIs/projectBodyAPIs";
import { defaultString } from "../src/components/commonFn";
import RenderProjectBody from "../src/components/projectBody";
import AboutPopUp from "../src/components/projectAboutPopup";
import Link from "next/link";

const Projects = () => {
  const [projects, SetProjects] = useState([]);

  const [popup, setPopup] = useState(false);

  const fetchProjects = async () => {
    const projectData = await fetchingProjects();

    // const projectItems = projectData.map((data) => {
    //   const items = fetchingProjectDeatail(data.attributes.ProjectName);
    //   return items;
    // });

    // console.log(projectItems);

    SetProjects(projectData);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <div
        className={
          popup ? style.projectsContainerNoScroll : style.projectsContainer
        }
      >
        {projects
          .sort((a, b) => {
            return b.id - a.id;
          })
          .map((Project) => {
            if (Project.attributes.ProjectName === "News") {
              return;
            }
            return (
              <div className={style.projectContainer} key={Project.id}>
                <div
                  className={style.projectHeader}
                  key={Project.attributes.ProjectName}
                  id={Project.attributes.ProjectName.toLowerCase()}
                >
                  <p className={style.projectName}>
                    {Project.attributes.ProjectName}
                  </p>
                  <Link
                    href={`/projects/#${Project.attributes.ProjectName.toLowerCase()}`}
                  >
                    <picture>
                      <img
                        src="/NK_Icon-dungo.svg"
                        className={style.dungoIcon}
                        alt="about"
                        onClick={() => setTimeout(() => setPopup(true), 500)}
                      />
                    </picture>
                  </Link>
                </div>

                <AboutPopUp
                  trigger={popup}
                  setTrigger={setPopup}
                  textContent={Project.attributes.Description}
                  thTextContent={Project.attributes.ThDescription}
                  downloadLink={defaultString(Project.attributes.DownloadLink)}
                />

                <RenderProjectBody
                  projectName={Project.attributes.ProjectName}
                />
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Projects;
