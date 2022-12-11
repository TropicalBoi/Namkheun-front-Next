export const defaultString = (input) => {
  if (!input) {
    return null;
  }
  return input;
};

export const replaceTags = (data) => {
  if (data) {
    return data.replace(/\n/g, "&nbsp;  \n &nbsp;  ");
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

    return inputData.substring(0, 120) + "...";
  }
  return null;
};

export const excerptHeader = (data) => {
  return data.substring(0, 40);
};

export const reRenderDate = (data) => {
  if (!data) {
    return null;
  }
  return data.replace(/([\w ]+)-([\w ]+)-([\w ]+)/g, "$3/$2/$1");
};

export const addHTTP = (data) => {
  if (!data) {
    return null;
  } else {
    const checkedInput = /[h][t][t][p]/.test(data);
    if (!checkedInput) {
      return `http://${data}`;
    }
    return data;
  }
};
