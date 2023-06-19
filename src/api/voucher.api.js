import axios from "axios";
import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterVoucherApi = async (data, params) => {
  return await adminRequest.post(`${HTTP_MGMT}/voucher/filter`, data, {
    params,
  });
};

export const createVoucherApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/voucher/create`, data);
};

export const updateVoucherApi = async (data, id) => {
  return await adminRequest.post(`${HTTP_MGMT}/voucher/update/${id}`, data);
};

export const deleteVoucherApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/voucher/delete`, data);
};

export const getVoucherByCodeApi = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/voucher/getVoucherByCode`, data);
};
