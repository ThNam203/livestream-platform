import { LoginFormData } from "@/app/(auth)/login/page";
import { RegisterFormData } from "@/app/(auth)/register/page";
import AxiosService from "./axiosService";

const Register = (data: RegisterFormData) => {
  return AxiosService.post(
    "/auth/signup",
    {
      username: data.username,
      password: data.password,
      birth: data.birth.toISOString(),
      email: data.email,
    },
    { withCredentials: true }
  );
};

const Login = (data: LoginFormData) => {
  return AxiosService.post(
    "/auth",
    {
      username: data.username,
      password: data.password,
    },
    { withCredentials: true }
  );
};

const logOut = () => {
  return AxiosService.post("/auth/logout", {});
};

const AuthService = {
  Register,
  Login,
  logOut,
};

export default AuthService;
