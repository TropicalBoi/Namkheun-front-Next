import axios from "axios";

export const fetchingProjects = async () => {
  const data = await axios.get(
    "https://namkheun-back.herokuapp.com/api/projects/"
  );
  return data.data.data;
};

export const fetchingProjectDeatail = async (projectName) => {
  const data = await axios.get(
    `https://namkheun-back.herokuapp.com/api/${projectName}?populate=%2A`
  );
  return data.data.data;
};
