// import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:9000" });

// api.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("access_token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

import axios from "axios";

const GATEWAY_URL = "http://localhost:8080"; // ajusta si tu gateway usa otro puerto

const api = axios.create({ baseURL: GATEWAY_URL });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;