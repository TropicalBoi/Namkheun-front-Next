import React, { useState, useEffect } from "react";
import {
  fetchingManifesto,
  fetchingFrost,
  fetchingNotes,
} from "../../pages/api/projectBodyAPIs";
import style from "../../styles/projects.module.css";

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
                    />
                  </picture>
                </div>
              );
            })}
          </>
        );
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

  return <>{renderBody(props.idNumber)}</>;
};

export default RenderProjectBody;
