import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigation } from "./AuthNavigation";
import { useReduxDispatch, useReduxSelector } from "../redux/hooks";
import { AppNavigation } from "./AppNavigation";
import StartUpScreen from "../screens/StartUpScreen";

const MainNavigation: React.FC = (): React.ReactElement => {
  const token = useReduxSelector((state) => state.env.auth.token);
  const isTriedLogin = useReduxSelector((state) => state.env.isTriedAutoLogin);
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    token ? setisAuth(true) : setisAuth(false);
  }, [token]);

  return (
    <NavigationContainer>
      {isAuth ? (
        <AppNavigation />
      ) : isTriedLogin ? (
        <AuthNavigation />
      ) : (
        <StartUpScreen />
      )}
    </NavigationContainer>
  );
};
export default MainNavigation;
