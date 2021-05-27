import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthRoutes, AuthStackParamList } from "./routes";

import Main from "../screens/Auth/Main";
import Registeration from "../screens/Auth/Registeration";
import Login from "../screens/Auth/Login";
import HowToLogin from "../screens/Auth/HowToLogin";
import colors from "../constants/colors";
import LanguageHeader from "../components/auth/LanguageHeader";
import { Platform } from "react-native";
import useTranslation from "../data/languages/translateLanguage";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ResetForgotPass from "../screens/Auth/ResetForgotPass";

export const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthNavigation = () => {
  const translation = useTranslation();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTintColor:
          Platform.OS === "android" ? colors.secondary : colors.third,
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? colors.third : colors.secondary,
        },
      }}
    >
      <AuthStack.Screen
        name={AuthRoutes.Main}
        component={Main}
        options={LanguageHeader}
      />
      <AuthStack.Screen
        name={AuthRoutes.Registeration}
        component={Registeration}
        options={{
          headerLeft: () => null,
          headerTitle: translation.register,
        }}
      />
      <AuthStack.Screen
        name={AuthRoutes.Login}
        component={Login}
        options={{
          headerTitle: translation.login,
        }}
      />
      <AuthStack.Screen
        name={AuthRoutes.HowToLogin}
        component={HowToLogin}
        options={{
          headerLeft: () => null,
          headerTitle: translation["login-option"],
        }}
      />
      <AuthStack.Screen
        name={AuthRoutes.ForgotPassword}
        component={ForgotPassword}
        options={{
          headerTitle: translation["forgot-pass"],
        }}
      />
      <AuthStack.Screen
        name={AuthRoutes.ResetForgotPass}
        component={ResetForgotPass}
        options={{
          headerTitle: translation["reset-code-forgot-pass"],
        }}
      />
    </AuthStack.Navigator>
  );
};
