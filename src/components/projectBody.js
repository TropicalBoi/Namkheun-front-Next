import React, { useState, useEffect } from "react";
import {
  fetchingManifesto,
  fetchingFrost,
  fetchingNotes,
} from "../APIs/projectBodyAPIs";
import style from "../../styles/projects.module.css";
import Link from "next/link";

const RenderProjectBody = (props) => {
  const [manifestos, SetManifestos] = useState([]);
  const [frosts, SetFrosts] = useState([]);
  const [notes, SetNotes] = useState([]);

  const fetch = async () => {
    try {
      const [manifestoData, frostData, notesData] = await Promise.all([
        fetchingManifesto(),
        fetchingFrost(),
        fetchingNotes(),
      ]);
      SetManifestos(manifestoData);
      SetFrosts(frostData);
      SetNotes(notesData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const renderBody = (inputId) => {
    switch (inputId) {
      case 1:
        return (
          <div className={style.projectBody}>
            {manifestos.map((Manifesto) => {
              return (
                <div key={Manifesto.id}>
                  <Link href={`/manifestos/${Manifesto.id}`}>
                    <div
                      key={Manifesto.attributes.CoverImages.data.attributes.url}
                    >
                      <picture>
                        <img
                          src={
                            Manifesto.attributes.CoverImages.data.attributes.url
                          }
                          className={style.manifestosCoverImg}
                          alt="manifesto"
                        />
                      </picture>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      case 2:
        return (
          <>
            {frosts.map((Frosts) => {
              return (
                <div
                  className={style.projectBodyFrost}
                  key={Frosts.attributes.CoverImages.data.attributes.url}
                >
                  <picture>
                    <img
                      src={Frosts.attributes.CoverImages.data.attributes.url}
                      className={style.frostsCoverImg}
                      alt="frost"
                    />
                  </picture>
                </div>
              );
            })}
          </>
        );
      case 3:
        return (
          <div className={style.projectBodyNotes}>
            {notes.map((Notes) => {
              return (
                <div key={Notes.id}>
                  <Link href={`/notes/${Notes.id}`}>
                    <div key={Notes.attributes.CoverImages.data.attributes.url}>
                      <picture>
                        <img
                          src={Notes.attributes.CoverImages.data.attributes.url}
                          className={style.notesCoverImg}
                          alt="notes"
                        />
                      </picture>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      default:
        return <p>{projectsId}</p>;
    }
  };

  return <>{renderBody(props.idNumber)}</>;
};

export default RenderProjectBody;
