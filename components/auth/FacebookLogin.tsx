import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  View,
} from "react-native";
import * as Facebook from "expo-facebook";
import { envConfig } from "../../data/config";
import { ButtonSyled } from "../ButtonSyled";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../constants/colors";
import useTranslation from "../../data/languages/translateLanguage";
import { useReduxDispatch } from "../../redux/hooks";
import { facebookAuth } from "../../redux/env/thunk/auth";
import { FacebookAuthData } from "../../redux/env/types";
import MyAlert from "../MyAlert";
import { ButtonWithComponent } from "../ButtonWithComponent";

type FacebookLoginProps = {
  setisLoading: (param: boolean) => void;
};

const FacebookLogin: React.FC<FacebookLoginProps> = (props) => {
  const translation = useTranslation();
  const [token, settoken] = useState("");
  const [serverErr, setserverErr] = useState<string>();

  const dispatch = useReduxDispatch();

  const onFacebookLogin = async () => {
    try {
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (result.type === "success") {
        settoken(result.token);
        props.setisLoading(true);
        const res = await fetch(
          `https://graph.facebook.com/me?access_token=${result.token}&fields=id,name,email,picture.height(500)`
        );
        const password = Math.random().toString(36).slice(-8);
        const data = await res.json();
        const authData: FacebookAuthData = {
          email: data.email,
          name: data.name,
          password,
          gender: "",
          birthYear: 0,
          surname: "",
          facebookData: {
            picture: data.picture?.data?.url,
            id: data.id,
          },
        };
        const response = await dispatch(facebookAuth(authData));

        if (!facebookAuth.fulfilled.match(response)) {
          props.setisLoading(false);
          setserverErr(response.payload);
        }
      }
    } catch (e) {
      Alert.alert("Error!", e.message, [{ text: "OK", onPress: () => {} }]);
      props.setisLoading(false);
    }
  };

  React.useEffect(() => {
    Facebook.initializeAsync({ appId: envConfig.FB_APP_ID });
  }, []);

  return (
    <View>
      <ButtonWithComponent
        bodyStyle={styles.fbBtn}
        onPress={() => onFacebookLogin()}
        textStyle={styles.fbBtnTxt}
      >
        <FontAwesome name="facebook-f" size={20} color={colors.secondary} />
        {"  " + translation["reg-fb"]}
      </ButtonWithComponent>
      {serverErr && (
        <MyAlert
          title={translation["alert-err"]}
          message={JSON.stringify(serverErr)}
          confirmTextBtn={translation.ok}
          cancelTextBtn={translation.cancel}
          hideConfirm={true}
          hideCancel={false}
          onConfirm={() => {}}
          onDismiss={() => setserverErr(undefined)}
          onCancel={() => setserverErr(undefined)}
        />
      )}
    </View>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({
  fbBtn: {
    backgroundColor: colors.primary,
    width: 300,
    maxWidth: "95%",
  },
  fbBtnTxt: {
    color: colors.secondary,
  },
});
