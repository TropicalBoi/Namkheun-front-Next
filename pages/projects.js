import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import style from "../styles/projects.module.css";
import {
  fetchingProjects,
  fetchingProjectDeatail,
} from "../src/APIs/projectBodyAPIs";
import RenderProjectBody from "../src/components/projectBody";

const Projects = () => {
  const [projects, SetProjects] = useState([]);

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
      <div className={style.projectsContainer}>
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
                >
                  <p className={style.projectName}>
                    {Project.attributes.ProjectName}
                  </p>

                  <picture>
                    <img
                      src="/NK_Icon-dungo.svg"
                      className={style.dungoIcon}
                      alt="about"
                    />
                  </picture>
                </div>
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
