import axios from "axios";
// import { toast } from "react-toastify";
// import auth from "./authService";
import logger from "./logService";

axios.interceptors.response.use(
  (config) => {
    config.headers.Authorization = `JWT ${localStorage.getItem("access")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
