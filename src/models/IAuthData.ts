import { IUser } from "./IUser";

export interface IAuthData {
  refreshToken: string;
  accessToken: string;
  userDto: IUser;
}
