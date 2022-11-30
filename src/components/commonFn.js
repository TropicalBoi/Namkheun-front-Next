export const defaultString = (input) => {
  if (!input) {
    return null;
  }
  return input;
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

export const excerptText = (data) => {
  if (data) {
    const inputData = data
      .replace(/\n/g, ` `)
      .replace(/\*{2}(.*?)\*{2}/g, `$1`)
      .replace(/[<u>](.*?)[</u>]/g, `$1`)
      .replace(/_(.*?)_/g, `$1`);

    return inputData.substring(0, 100) + "...";
  }
  return null;
};

export const excerptHeader = (data) => {
  return data.substring(0, 35);
};

export const reRenderDate = (data) => {
  if (!data) {
    return null;
  }
  return data.replace(/([\w ]+)-([\w ]+)-([\w ]+)/g, "$3/$2/$1");
};

export const addHTTP = (data) => {
  const checkedInput = /[h][t][t][p]/.test(data);
  if (!checkedInput) {
    return `http://${data}`;
  }
  return data;
};
