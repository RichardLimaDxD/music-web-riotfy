import axios from "axios";

const api = axios.create({
  baseURL: "https://riotfy.onrender.com",
  timeout: 9000,
});

export default api;
