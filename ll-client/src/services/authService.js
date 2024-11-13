import axios from "axios";
import config from "../config";

const API_URL = config.API_URL + "/auth";

const register = (username, email, password) => {
  return axios.post(`${API_URL}/register`, { username, email, password });
};

const login = (email, password) => {
  return axios
    .post(`${API_URL}/login`, { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    });
};

const authService = {
  register,
  login,
};

export default authService;
