import axios from "axios";

const API = axios.create({
  baseURL: "https://frontend-jobs-flame.vercel.app/api",
});

export default API;
