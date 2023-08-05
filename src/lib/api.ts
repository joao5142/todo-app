import axios, { AxiosRequestHeaders } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@/utils/AppError";
import { TOKEN_COLLECTION } from "@/storage";

const axiosInstance = axios.create({
  baseURL: "http://10.0.2.2:8000/api",
  timeout: 10000,
});

const requestHandler = async (request: AxiosRequestHeaders) => {
  try {
    let token = await AsyncStorage.getItem(TOKEN_COLLECTION);

    if (token) {
      request.headers.Authorization = "Bearer " + token;
    }
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
