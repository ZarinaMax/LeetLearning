import axios from "axios";
import config from "../config";

const API_URL = config.API_URL + "/user";

const getUserData = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUserData = (userData) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/me`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const userService = {
  getUserData,
  updateUserData,
};

export default userService;
