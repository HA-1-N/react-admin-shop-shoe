import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterBrandApi = async (data, params) => {
  return await adminRequest.post(`${HTTP_MGMT}/brand/filter`, data, { params });
};

export const createBrandApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/brand/create`, data);
};

export const updateBrandApi = async (data, brandCode) => {
  return await adminRequest.put(`${HTTP_MGMT}/brand/update/${brandCode}`, data);
};

export const deleteBrandApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/brand/delete`, data);
};

export const getBrandByCodeApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/brand/getBrandByCode`, data);
};
