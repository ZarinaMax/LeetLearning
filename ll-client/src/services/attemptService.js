// src/services/attemptService.js
import axios from "axios";
import config from "../config";

const API_URL = config.API_URL + "/attempts";
const USER_ATTEMPTS_URL = config.API_URL + "/user/attempts";

const submitAttempt = (taskId, code) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${API_URL}`,
    { taskId, code },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

const getAttemptStatus = (attemptId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/${attemptId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUserAttempts = () => {
  const token = localStorage.getItem("token");
  return axios.get(USER_ATTEMPTS_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAttemptsByTaskId = (taskId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${USER_ATTEMPTS_URL}/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const attemptService = {
  submitAttempt,
  getAttemptStatus,
  getUserAttempts,
  getAttemptsByTaskId,
};

export default attemptService;
