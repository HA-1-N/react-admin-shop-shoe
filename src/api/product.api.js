import axios from "axios";
import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterProductApi = async (data, params) => {
  return await axios.post(
    `${HTTP_MGMT}/product/filter`,
    data,
    { params },
    config
  );
};

export const createProduct = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/product/create`, data);
};

export const updateProduct = async (data, productCode) => {
  return await adminRequest.post(
    `${HTTP_MGMT}/product/update/${productCode}`,
    data
  );
};

export const deleteProduct = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/product/delete`, data);
};

export const getProduct = async (productCode) => {
  return await adminRequest.get(`${HTTP_MGMT}/product/${productCode}`);
};
