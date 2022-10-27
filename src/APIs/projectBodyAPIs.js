import axios from "axios";

export const fetchingProjects = async () => {
  const data = await axios.get(
    "https://namkheun-back.herokuapp.com/api/projects/"
  );
  return data.data.data;
};

export const fetchingManifesto = async () => {
  const manifestoData = await axios.get(
    "https://namkheun-back.herokuapp.com/api/manifestos?populate=%2A"
  );
  return manifestoData.data.data;
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
