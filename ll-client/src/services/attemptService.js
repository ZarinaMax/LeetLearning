import axios from "axios";
import config from "../config";

const API_URL = config.API_URL + "/attempts";

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

const attemptService = {
  submitAttempt,
  getAttemptStatus,
};

export default attemptService;
