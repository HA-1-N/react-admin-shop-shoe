import axios from "axios";
import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterCategoryApi = async (data, params) => {
  return await adminRequest.post(`${HTTP_MGMT}/category/filter`, data, {
    params,
  });
};

export const createCategoryApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/category/create`, data);
};

export const updateCategoryApi = async (data, id) => {
  return await adminRequest.post(`${HTTP_MGMT}/category/update/${id}`, data);
};

export const deleteCategoryApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/category/delete`, data);
};

export const getCategoryByNameApi = async (data) => {
  return await adminRequest.post(
    `${HTTP_MGMT}/category/getCategoryByName`,
    data
  );
};
