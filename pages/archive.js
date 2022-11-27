import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import {
  fetchingProjects,
  fetchingProjectDeatail,
} from "../src/APIs/projectBodyAPIs";

import {
  defaultStringToLowerCase,
  reRenderDate,
} from "../src/components/commonFn";

import Link from "next/link";
import style from "../styles/archiver.module.css";

const Archive = () => {
  const [table, setTable] = useState([]);

  const fetchTable = async () => {
    const projectData = await fetchingProjects();

    try {
      const result = Promise.all(
        projectData.map(async (data) => {
          const items = await fetchingProjectDeatail(
            data.attributes.ProjectName
          );

          // console.log(items);

          if (typeof items === "object" && !Array.isArray(items)) {
            const singleObj = {
              id: 1,
              title: items.attributes.project.data.attributes.ProjectName,
              date: "-",
              Project: items.attributes.project.data.attributes.ProjectName,
              UrlProject: null,
            };

            return singleObj;
          } else if (Array.isArray(items)) {
            const arrData = items.map((eachArr) => {
              const returnDefault = (input) => {
                if (!input) {
                  return null;
                }
                return input.attributes.ProjectName;
              };

              const EacObjData = {
                id: eachArr.id,
                title: eachArr.attributes.Title,
                date: reRenderDate(eachArr.attributes.PublishDate),
                Project: returnDefault(eachArr.attributes.project.data),
                UrlProject: defaultStringToLowerCase(
                  eachArr.attributes.project.data
                ),
              };

              return EacObjData;
            });
            return arrData;
          } else {
            return;
          }
        })
      );

      result.then((value) => {
        const flattend = value.flat();
        console.log(flattend);
        setTable(flattend);
      }, []);
      return;
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
                {value.UrlProject ? (
                  <Link href={`/projects/${value.UrlProject}/${value.id}`}>
                    <div className={style.archiveDetail} key={index}>
                      <p className={style.archiveTitle}>{value.title}</p>
                      <p className={style.archiveDate}>{value.date}</p>
                      <p className={style.archiveProject}>{value.Project}</p>
                    </div>
                  </Link>
                ) : (
                  <Link href="/projects">
                    <div className={style.archiveDetail} key={index}>
                      <p className={style.archiveTitle}>{value.title}</p>
                      <p className={style.archiveDate}>{value.date}</p>
                      <p className={style.archiveProject}>{value.Project}</p>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Archive;
