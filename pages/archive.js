import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import {
  fetchingManifesto,
  fetchingFrost,
  fetchingNotes,
} from "./api/projectBodyAPIs";
import style from "../styles/Archiver.module.css";

const archive = () => {
  const [manifestosInput, setManifestosInput] = useState([]);
  const [notesInput, setNotesInput] = useState([]);

  const fetchTable = async () => {
    try {
      const [manifestoData, frostData, notesData] = await Promise.all([
        fetchingManifesto(),
        fetchingFrost(),
        fetchingNotes(),
      ]);
      setManifestosInput(manifestoData);
      setNotesInput(notesData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

  const manifestosList = manifestosInput.map((manifestosDetails) => {
    return {
      title: manifestosDetails.attributes.Title,
      date: "xx/xx/xx",
      Project: manifestosDetails.attributes.project.data.attributes.ProjectName,
    };
  });

  const notesList = notesInput.map((notesDetails) => {
    return {
      title: notesDetails.attributes.Title,
      date: "xx/xx/xx",
      Project: notesDetails.attributes.project.data.attributes.ProjectName,
    };
  });

  const table = manifestosList.concat(notesList);

  return (
    <Layout>
      <div className={style.archiveContainer}>
        <div className={style.archiveInfo}>
          <div className={style.heading}>
            <p className={style.headingTitle}>Title</p>
            <p className={style.headingDate}>Date</p>
            <p className={style.headingProject}>Project</p>
          </div>

          {table.map((value, index) => {
            return (
              <div className={style.archiveDetail} key={index}>
                <p className={style.archiveTitle}>{value.title}</p>
                <p className={style.archiveDate}>{value.date}</p>
                <p className={style.archiveProject}>{value.Project}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default archive;
