export const defaultString = (input) => {
  if (!input) {
    return "-";
  }
  return input;
};

export const replaceTags = (data) => {
  return data
    .replace(/\n/g, "<br />")
    .replace(/\*{2}(.*?)\*{2}/g, "<b>$1</b>")
    .replace(/_(.*?)_/g, "<i>$1</i>");
};

export const reRenderDate = (data) => {
  return data.replace(/([\w ]+)-([\w ]+)-([\w ]+)/g, "$3/$2/$1");
};
