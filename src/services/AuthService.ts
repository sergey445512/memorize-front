import api from "../http";
import { AxiosResponse } from "axios";
import { IAuthData } from "../models/IAuthData";

export default class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthData>> => {
    const result = await api.post("/login", { email, password });
    return result;
  };

  static registration = async (email: string, password: string) => {
    const result = await api.post("/registration", { email, password });
    return result;
  };

  static logout = async () => {
    const result = await api.post("/logout");
    return result;
  };
}
