import axios from "axios";

const getTokenFromLocalStorage = localStorage.getItem("adminToken")
  ? JSON.parse(localStorage.getItem("adminToken"))
  : null;

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getTokenFromLocalStorage}`,
  },
};
export default (baseURL) => {
  return axios.create({
    baseURL,
    ...commonConfig,
  });
};
