// src/services/taskService.js
import axios from "axios";
import config from "../config";

const API_URL = config.API_URL + "/tasks";

const getTasks = () => {
  return axios.get(API_URL);
};

const getTaskById = (id) => {
  return axios.get(API_URL + "/" + id);
};

const taskService = {
  getTasks,
  getTaskById,
};

export default taskService;
