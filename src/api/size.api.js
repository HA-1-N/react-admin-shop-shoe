import axios from "axios";
import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterSizeApi = async (data, params) => {
  return await adminRequest.post(`${HTTP_MGMT}/size/filter`, data, { params });
};

export const createSizeApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/size/create`, data);
};

export const updateSizeApi = async (data, id) => {
  return await adminRequest.post(`${HTTP_MGMT}/size/update/${id}`, data);
};

export const deleteSizeApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/size/delete`, data);
};

export const getSizeByCodeApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/size/getSizeByCode`, data);
};
