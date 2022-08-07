import axios from "axios";
import store from "../store/rootStore";
import { logoutSuccess } from "../store/slice/user/userSlice";
const Axios = axios.create({
  timeout: 1000,
});

Axios.interceptors.request.use(function (config) {
  const token = store.getState().user?.token;
  if (token && token.length > 0) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const httpStatus = error.status || error.response?.status;
    if (httpStatus === 403 || httpStatus === 401) {
      store.dispatch(logoutSuccess());
    }
    return Promise.reject(error);
  }
);

export default Axios;
