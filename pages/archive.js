import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import {
  fetchingManifesto,
  fetchingFrost,
  fetchingNotes,
} from "../src/APIs/projectBodyAPIs";
import Link from "next/link";
import style from "../styles/archiver.module.css";

const Archive = () => {
  const [table, setTable] = useState([]);

  const fetchTable = async () => {
    try {
      const [manifestoData, frostData, notesData] = await Promise.all([
        fetchingManifesto(),
        fetchingFrost(),
        fetchingNotes(),
      ]);

      const manifestosList = manifestoData.map((manifestosDetails) => {
        return {
          id: manifestosDetails.id,
          title: manifestosDetails.attributes.Title,
          date: manifestosDetails.attributes.PublishDate.replace(
            /([\w ]+)-([\w ]+)-([\w ]+)/g,
            "$3/$2/$1"
          ),
          Project:
            manifestosDetails.attributes.project.data.attributes.ProjectName,
          UrlProject:
            manifestosDetails.attributes.project.data.attributes.ProjectName.toLowerCase(),
        };
      });

      const notesList = notesData.map((notesDetails) => {
        return {
          id: notesDetails.id,
          title: notesDetails.attributes.Title,
          date: notesDetails.attributes.PublishDate.replace(
            /([\w ]+)-([\w ]+)-([\w ]+)/g,
            "$3/$2/$1"
          ),
          Project: notesDetails.attributes.project.data.attributes.ProjectName,
          UrlProject:
            notesDetails.attributes.project.data.attributes.ProjectName.toLowerCase(),
        };
      });

      console.log(notesList[0].UrlProject);

      const tableDetail = manifestosList.concat(notesList);
      setTable(tableDetail);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

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
              <div key={index}>
                <Link href={`/${value.UrlProject}/${value.id}`}>
                  <div className={style.archiveDetail} key={index}>
                    <p className={style.archiveTitle}>{value.title}</p>
                    <p className={style.archiveDate}>{value.date}</p>
                    <p className={style.archiveProject}>{value.Project}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Archive;
