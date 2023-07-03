import axios from "axios";
import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const getAllOrderApi = async () => {
  return await adminRequest.get(`${HTTP_MGMT}/order/get-all-orders`);
};

export const getOrderByIdApi = async (id) => {
  return await adminRequest.post(`${HTTP_MGMT}/order/get-orders-user-id/${id}`);
};

export const updateStatusOrderApi = async (data, id) => {
  return await adminRequest.put(
    `${HTTP_MGMT}/order/update-order-status/${id}`,
    data
  );
};
