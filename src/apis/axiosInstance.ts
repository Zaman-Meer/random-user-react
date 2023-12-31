import axios, { AxiosInstance } from "axios";

let axiosInstance: AxiosInstance;

axiosInstance = axios.create({
  baseURL: process.env.apiGatewayUrl,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

axiosInstance.defaults.headers.get.Accept = "application/json";
axiosInstance.defaults.headers.post.Accept = "application/json";

export { axiosInstance };
