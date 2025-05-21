import axios from "axios";

const API = axios.create({
  baseURL: "https://frontend-jobs-flame.vercel.app/api", // 🔁 Replace with your backend URL
});

export default API;
