import { StackNavigationProp } from "@react-navigation/stack";
import {
  AppRoutes,
  AppStackParamList,
  AuthRoutes,
  AuthStackParamList,
} from "./routes";

export type AuthNavigationProp<
  RouteName extends keyof AuthStackParamList = AuthRoutes
> = StackNavigationProp<AuthStackParamList, RouteName>;

export type AppNavigationProp<
  RouteName extends keyof AppStackParamList = AppRoutes
> = StackNavigationProp<AppStackParamList, RouteName>;
