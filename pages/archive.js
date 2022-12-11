import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import {
  fetchingProjects,
  fetchingProjectDeatail,
} from "../src/APIs/projectBodyAPIs";

import { defaultString, reRenderDate } from "../src/components/commonFn";

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
              date: reRenderDate(defaultString(items.attributes.PublishDate)),
              Project: data.attributes.ProjectName,
              UrlProject: null,
            };

            return singleObj;
          } else if (Array.isArray(items)) {
            const arrData = items.map((eachArr) => {
              const EachObjData = {
                id: eachArr.id,
                title: eachArr.attributes.Title,
                date: reRenderDate(
                  defaultString(eachArr.attributes.PublishDate)
                ),
                Project: data.attributes.ProjectName,
                UrlProject: data.attributes.ProjectName.toLowerCase(),
              };

              return EachObjData;
            });
            return arrData;
          } else {
            return;
          }
        })
      );

      result.then((value) => {
        const flattend = value.flat();

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
            if (value.UrlProject === "news") {
              return (
                <div className={style.archiveRow} key={index}>
                  <picture>
                    <img
                      src="/NK_Bullet.png"
                      className={style.bullet}
                      alt="bullet"
                    />
                  </picture>
                  <div className={style.archiveDetail} key={index}>
                    <Link href={`/${value.UrlProject}/${value.id}`}>
                      <p className={style.archiveTitle}>{value.title}</p>
                    </Link>
                    <p className={style.archiveDate}>{value.date}</p>
                    <Link href={`/${value.UrlProject}`}>
                      <p className={style.archiveProject}>{value.Project}</p>
                    </Link>
                  </div>
                </div>
              );
            } else if (value.UrlProject) {
              return (
                <div className={style.archiveRow} key={index}>
                  <picture>
                    <img
                      src="/NK_Bullet.png"
                      className={style.bullet}
                      alt="bullet"
                    />
                  </picture>
                  <div className={style.archiveDetail} key={index}>
                    <Link href={`/projects/${value.UrlProject}/${value.id}`}>
                      <p className={style.archiveTitle}>{value.title}</p>
                    </Link>
                    <p className={style.archiveDate}>{value.date}</p>
                    <Link href={`/projects#${value.UrlProject}`}>
                      <p className={style.archiveProject}>{value.Project}</p>
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <div className={style.archiveRow} key={index}>
                <picture>
                  <img
                    src="/NK_Bullet.png"
                    className={style.bullet}
                    alt="bullet"
                  />
                </picture>
                <Link href={`/projects#${value.Project.toLowerCase()}`}>
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
