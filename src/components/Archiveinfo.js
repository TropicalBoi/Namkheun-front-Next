import React from "react";

const archiveinfo = (props) => {
  const archiveDatas = props.archiveData;

  return (
    <div>
      <h1>{archiveDatas.title}</h1>
    </div>
  );
};

export default archiveinfo;
