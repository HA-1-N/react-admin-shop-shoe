import axios from "axios";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterColorApi = async (data, params) => {
  return await axios.post(`${HTTP_MGMT}/color/filter`, data, { params });
};
