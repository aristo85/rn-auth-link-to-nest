import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRoutes, AppStackParamList } from "./routes";
import LandingScreen from "../screens/App/LandingScreen";

export const AppStack = createStackNavigator<AppStackParamList>();

export const AppNavigation = () => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen name={AppRoutes.Landing} component={LandingScreen} />
  </AppStack.Navigator>
);
