import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://stoked-keyword-436905-f9.el.r.appspot.com/api",
});


// Add a request interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
