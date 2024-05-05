import AxiosService from "./axiosService";

const getInfo = () => {
  return AxiosService.get("/user/info", { withCredentials: true });
};

const UserService = {
  getInfo,
};

export default UserService;
