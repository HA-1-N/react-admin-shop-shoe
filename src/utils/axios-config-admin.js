import axios from "axios";

const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://18.142.128.26/api";
// const BASE_URL = "http://localhost:5000/api";

// 13.228.225.19
// 18.142.128.26
// 54.254.162.138
const getUser = localStorage.getItem("user");
const user = JSON.parse(getUser);

const TOKEN = user?.accessToken || "";

export const adminRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
