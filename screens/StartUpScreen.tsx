import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { getObject } from "../data/localStorage";
import { setToken, tryAutoLogin } from "../redux/env/envSlice";
import { authentication } from "../redux/env/thunk/auth";
import { useReduxDispatch, useReduxSelector } from "../redux/hooks";

const StartUpScreen = () => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const authData = await getObject("authData");
      if (!authData) {
        dispatch(tryAutoLogin(true));
        return;
      }
      const { token, expireDate, userId } = authData;
      const currentDate = new Date().getTime();
      if (expireDate <= currentDate || !token || !userId) {
        dispatch(tryAutoLogin(true));
      }

      dispatch(authentication(token, userId, expireDate));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <ActivityIndicator
      size="large"
      color={colors.primary}
      style={styles.spiner}
    />
  );
};

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default StartUpScreen;
