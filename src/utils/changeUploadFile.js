import { convertFilesToArr } from "./convertFileToArr";

export const changeFileUploadPersonnel = (e, files, fileUploaded, size) => {
  const dataFiles = [];
  if (e.target.files) {
    const currentFiles = convertFilesToArr(e.target.files);
    if (files.length > 0) {
      dataFiles.push(...files);
    }
    for (let i = 0; i < currentFiles.length; i++) {
      if (dataFiles.length + (fileUploaded.length || 0) === size) {
        break;
      }
      const file = currentFiles[i];
      if (file) {
        dataFiles.push(file);
      }
    }
    e.target.value = null;
    return dataFiles;
  } else {
    return dataFiles;
  }
};
