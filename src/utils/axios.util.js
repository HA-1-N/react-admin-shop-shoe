export const convertObjectToApplicationJsonFormData = (obj) =>
  new Blob([JSON.stringify(obj)], {
    type: "application/json",
  });
