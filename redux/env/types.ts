type UserData = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  updatedAt: number;
};

export type User = {
  user: UserData;
  token: string;
};

export type CreateUserError = {
  message: string;
};

export type RegRequest = {
  success: boolean;
};

export type ForgotPassword = {
  success: boolean;
};

export type ResetCodeForgotPass = {
  success: boolean;
  email: string;
  resetCode: number;
};

export type ResetForgotPass = {
  newPassword: string;
  email: string;
  resetCode: number;
};

export type RegData = {
  name: string;
  surname: string;
  email: string;
  gender: "female" | "male";
  birthYear: number;
  password: string;
  confirmPass: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type FacebookAuthData = {
  name: string;
  surname: string;
  email: string;
  gender: "female" | "male" | "";
  birthYear: number;
  password: string;
  facebookData: any;
};
