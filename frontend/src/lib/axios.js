import axios from "axios"

 const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://chatvibe-backend-clce.onrender.com/api",
  // baseURL: "https://chatvibe-backend-clce.onrender.com/api",
  withCredentials: true,
})

export default axiosInstance