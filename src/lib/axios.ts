import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@/utils/AppError";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const requestHandler = async (request) => {
  try {
    let token = await AsyncStorage.getItem("token");
    request.headers.Authorization = "Bearer " + token;
  } catch (e) {}

  return request;
};

axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
