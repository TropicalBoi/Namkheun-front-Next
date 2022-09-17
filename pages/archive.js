import React from "react";
import Layout from "../src/components/layout";
import content from "../../content.json";
import style from "../styles/Archiver.module.css";

const archive = () => {
  return (
    <Layout>
      <div className={style.archiveContainer}>
        <div className={style.archiveInfo}>
          <div className={style.heading}>
            <p className={style.headingTitle}>Title</p>
            <p className={style.headingDate}>Date</p>
            <p className={style.headingProject}>Project</p>
          </div>

          {Object.entries(content).map((value, index) => {
            return (
              <div key={index} className={style.archiveDetail}>
                <p className={style.archiveTitle}>{value[1].title}</p>
                <p className={style.archiveDate}>{value[1].date}</p>
                <p className={style.archiveProject}>{value[1].Project}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default archive;
