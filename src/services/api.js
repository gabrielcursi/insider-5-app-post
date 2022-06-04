import axios from "axios";

const api = axios.create({
  baseURL: "http://IPDaMaquina:1337",
});

export default api;
