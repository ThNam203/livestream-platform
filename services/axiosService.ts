import axios from "axios";

const baseURL = "http://localhost:8080/";

const AxiosService = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default AxiosService;
