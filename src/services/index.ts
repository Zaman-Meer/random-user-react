import { axiosInstance } from "../apis/axiosInstance";
import { UserSendDataType } from "../types";

const API_URL = `${process.env.REACT_APP_API_GATEWAY_URL}/api`;

export const fetchUserData = (userId: string) => {
  return axiosInstance.get(`${API_URL}/user/${userId}`);
};

export const createUser = (payload: UserSendDataType) => {
  return axiosInstance.post(`${API_URL}/user`, payload);
};

export const updateUserData = (payload: UserSendDataType, userId: string) => {
  return axiosInstance.put(`${API_URL}/user/${userId}`, payload);
};

export const fetchAllSectors = () => {
  return axiosInstance.get(`${API_URL}/sector`);
};
