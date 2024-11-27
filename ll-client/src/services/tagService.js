// src/services/tagService.js
import axios from "axios";
import config from "../config";

const API_URL = config.API_URL + "/tags";

const getTags = () => {
  return axios.get(API_URL);
};

const tagService = {
  getTags,
};

export default tagService;
