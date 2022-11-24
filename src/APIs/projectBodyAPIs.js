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

export const fetchingFrost = async () => {
  const frostsData = await axios.get(
    "https://namkheun-back.herokuapp.com/api/frosts?populate=%2A"
  );
  return frostsData.data.data;
};

export const fetchingNotes = async () => {
  const notesData = await axios.get(
    "https://namkheun-back.herokuapp.com/api/notes?populate=%2A"
  );
  return notesData.data.data;
};
