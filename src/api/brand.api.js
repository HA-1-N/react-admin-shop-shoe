import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterBrandApi = async (data, params) => {
  return await adminRequest.post(`${HTTP_MGMT}/brand/filter`, data, { params });
};
