import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonSyled } from "../../components/ButtonSyled";
import { getObject } from "../../data/localStorage";
import { AppRoutes } from "../../navigation/routes";
import { AppNavigationProp } from "../../navigation/types";
import { logOut } from "../../redux/env/thunk/auth";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";

type LandingScreenProps = {
  navigation: AppNavigationProp<AppRoutes.Landing>;
};

const LandingScreen: React.FC<LandingScreenProps> = () => {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector((state) => state.user.user);
  const auth = useReduxSelector((state) => state.env.auth);
  useEffect(() => {
    const getData = async () => {
      const authData = await getObject("authData");
    };
    getData();
  }, []);

  return (
    <View>
      <Text>Hello {user.user?.name}</Text>
      <ButtonSyled
        bodyStyle=""
        textStyle=""
        onPress={() => {
          dispatch(logOut());
        }}
      >
        logout
      </ButtonSyled>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});
