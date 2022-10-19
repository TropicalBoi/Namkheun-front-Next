import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import style from "../styles/projects.module.css";
import axios from "axios";

const Projects = () => {
  const [projects, SetProjects] = useState([]);
  const [manifestos, SetManifestos] = useState([]);
  const [notes, SetNotes] = useState([]);

  const fetch = async () => {
    const data = await axios.get(
      "https://namkheun-back.herokuapp.com/api/projects/"
    );
    SetProjects(data.data.data);
  };

  const fetchManifesto = async () => {
    const manifestoData = await axios.get(
      "https://namkheun-back.herokuapp.com/api/manifestos?populate=%2A"
    );
    SetManifestos(manifestoData.data.data);
  };

  const fetchNotes = async () => {
    const notesData = await axios.get(
      "https://namkheun-back.herokuapp.com/api/notes?populate=%2A"
    );
    SetNotes(notesData.data.data);
  };

  useEffect(() => {
    fetch();
    fetchManifesto();
    fetchNotes();
  }, []);

  const renderProjectBody = (projectsId) => {
    switch (projectsId) {
      case 1:
        return (
          <>
            {manifestos.map((Manifesto) => {
              return (
                <div
                  className={style.projectBody}
                  key={Manifesto.attributes.CoverImages.data.attributes.url}
                >
                  <picture>
                    <img
                      src={Manifesto.attributes.CoverImages.data.attributes.url}
                      className={style.manifestosCoverImg}
                    />
                  </picture>
                </div>
              );
            })}
          </>
        );
      case 2:
        return <p>{projectsId}</p>;
      case 3:
        return (
          <>
            {notes.map((Notes) => {
              return (
                <div
                  className={style.projectBody}
                  key={Notes.attributes.CoverImages.data.attributes.url}
                >
                  <picture>
                    <img
                      src={Notes.attributes.CoverImages.data.attributes.url}
                      className={style.notesCoverImg}
                    />
                  </picture>
                </div>
              );
            })}
          </>
        );
      default:
        return <p>{projectsId}</p>;
    }
  };

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
                {renderProjectBody(Project.id)}
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Projects;
