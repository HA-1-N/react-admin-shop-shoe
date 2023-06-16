export const convertFilesToArr = (files) => {
  const arrFiles = [];

  if (files === null || files.length === 0) {
    return arrFiles;
  }

  for (let i = 0; i < files.length; i++) {
    arrFiles.push(files[i]);
  }

  return arrFiles;
};
