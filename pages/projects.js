import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import style from "../styles/projects.module.css";
import axios from "axios";

const Projects = () => {
  const [projects, SetProjects] = useState([]);
  const [manifestos, SetManifestos] = useState([]);

  const fetch = async () => {
    const data = await axios.get(
      "https://namkheun-back.herokuapp.com/api/projects/"
    );
    console.log(data.data.data);
    SetProjects(data.data.data);
  };

  const fetchManifesto = async () => {
    const manifestoData = await axios.get(
      "https://namkheun-back.herokuapp.com/api/manifestos?populate=%2A"
    );
    SetManifestos(manifestoData.data);
  };

  useEffect(() => {
    fetch();
    fetchManifesto();
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
              <div className={style.projectContainer}>
                <div
                  className={style.projectHeader}
                  key={Project.attributes.ProjectName}
                >
                  <p className={style.projectName}>
                    {Project.attributes.ProjectName}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Projects;
