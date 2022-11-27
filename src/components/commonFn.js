export const defaultString = (input) => {
  if (!input) {
    return null;
  }
  return input;
};

export const defaultStringToLowerCase = (input) => {
  if (!input) {
    return null;
  }
  return input.attributes.ProjectName.toLowerCase();
};

export const replaceTags = (data) => {
  if (data) {
    return data
      .replace(/\n/g, "<br />")
      .replace(/\*{2}(.*?)\*{2}/g, "<b>$1</b>")
      .replace(/_(.*?)_/g, "<i>$1</i>");
  }
  return null;
};

export const reRenderDate = (data) => {
  return data.replace(/([\w ]+)-([\w ]+)-([\w ]+)/g, "$3/$2/$1");
};