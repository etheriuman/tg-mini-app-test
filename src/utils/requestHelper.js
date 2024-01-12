import axios from "axios";

const baseURL = ""; //記得放入網址

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token");

        // // 如果 token 存在的話，則帶入到 headers 當中
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        return config;
    },
    (err) => Promise.reject(err),
);

export const apiHelper = axiosInstance;
