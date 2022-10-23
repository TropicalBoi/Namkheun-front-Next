import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import style from "../styles/projects.module.css";
import RenderProjectBody from "../src/components/projectBody";
import { fetchingProjects } from "./api/projectBodyAPIs";

const Projects = () => {
  const [projects, SetProjects] = useState([]);

  const fetchProjects = async () => {
    const data = await fetchingProjects();
    SetProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <div className={style.projectsContainer}>
        {projects
          .sort((a, b) => {
            return a.id - b.id;
          })
          .map((Project) => {
            return (
              <div className={style.projectContainer} key={Project.id}>
                <div
                  className={style.projectHeader}
                  key={Project.attributes.ProjectName}
                >
                  <p className={style.projectName}>
                    {Project.attributes.ProjectName}
                  </p>
                </div>
                <RenderProjectBody idNumber={Project.id} />
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Projects;
