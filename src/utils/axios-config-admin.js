import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const getUser = localStorage.getItem("user");
const user = JSON.parse(getUser);

const TOKEN = user.accessToken;

export const adminRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
