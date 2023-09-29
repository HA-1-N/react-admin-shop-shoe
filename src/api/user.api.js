import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterUserApi = async (body, params) => {
  return await adminRequest.post(`${HTTP_MGMT}/users/filter`, body, { params });
};

// export const createBrandApi = async (data) => {
//   return await adminRequest.post(`${HTTP_MGMT}/brand/create`, data);
// };

export const updateUserApi = async (data, id) => {
  return await adminRequest.put(`${HTTP_MGMT}/users/update/${id}`, data);
};

// export const deleteBrandApi = async (data) => {
//   return await adminRequest.post(`${HTTP_MGMT}/brand/delete`, data);
// };

// export const getBrandByCodeApi = async (data) => {
//   return await adminRequest.post(`${HTTP_MGMT}/brand/getBrandByCode`, data);
// };
