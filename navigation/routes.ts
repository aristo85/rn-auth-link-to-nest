export enum AuthRoutes {
  Main = "Main",
  Registeration = "Registeration",
  Login = "Login",
  HowToLogin = "HowToLogin",
  ForgotPassword = "ForgotPassword",
  ResetForgotPass = "ResetForgotPass",
}

export type AuthStackParamList = {
  [AuthRoutes.Main]: undefined;
  [AuthRoutes.Registeration]: undefined;
  [AuthRoutes.Login]: { update: boolean } | undefined; // just an example, "update" will later be used for version checks
  [AuthRoutes.HowToLogin]: undefined;
  [AuthRoutes.ForgotPassword]: undefined;
  [AuthRoutes.ResetForgotPass]: undefined;
};

export enum AppRoutes {
  Landing = "Landing",
}

export type AppStackParamList = {
  [AppRoutes.Landing]: undefined;
};
