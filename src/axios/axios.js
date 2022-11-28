import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "http://localhost:8800/",
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        "Content-Type": "text/plain",
    },
});
export default axiosInstance;