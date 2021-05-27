import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import { ButtonSyled } from "../../components/ButtonSyled";
import Card from "../../components/Card";
import colors from "../../constants/colors";
import { media } from "../../constants/responsiveStyle";
import { AuthRoutes } from "../../navigation/routes";
import { AuthNavigationProp } from "../../navigation/types";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import * as yup from "yup";
import useTranslation from "../../data/languages/translateLanguage";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { requestLogin } from "../../redux/env/thunk/auth";
import MyAlert from "../../components/MyAlert";
import TextTitle from "../../components/TextTitle";

type Errmsg =
  | ""
  | "email-must-be-valid"
  | "email-required"
  | "pass-required"
  | "at-least-six";

type ValidEr = {
  path: string;
  message: Errmsg;
};

let schema = yup.object().shape({
  email: yup.string().email("email-must-be-valid").required("email-required"),
  password: yup.string().required("pass-required").min(6, "at-least-six"),
});

type LoginScreenProps = {
  navigation: AuthNavigationProp<AuthRoutes.Login>;
};

const Login: React.FC<LoginScreenProps> = (props) => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [validErrors, setValidErrors] = useState<ValidEr>({
    path: "",
    message: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [serverErr, setserverErr] = useState<string>();

  const dispatch = useReduxDispatch();
  const translation = useTranslation();

  const handleLogin = async () => {
    setisLoading(true);
    const loginData = { email, password };
    try {
      const isValid = await schema.isValid({
        ...loginData,
      });
      if (isValid) {
        setValidErrors({ path: "", message: "" });
        const response = await dispatch(requestLogin(loginData));
        if (!requestLogin.fulfilled.match(response)) {
          setisLoading(false);
          setserverErr(response.payload);
        }
      }
      // otherwise if not valid add the error to the error list
      await schema.validate({
        ...loginData,
      });
      setisLoading(false);
    } catch (err) {
      const { path, message } = err;
      setValidErrors({ path, message });
      setisLoading(false);
    }
  };

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={colors.primary}
      style={styles.spiner}
    />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Card
        style={
          Dimensions.get("window").width > 600
            ? { ...media.containerB, ...styles.card }
            : { ...media.container, ...styles.card }
        }
      >
        <Input
          style={styles.input}
          labelStyle={styles.label}
          label={translation["e-mail"] + ":"}
          placeholder={translation["type-here"]}
          onChangeText={(value) => setemail(value.trim())}
          errorMessage={
            validErrors.path === "email" ? translation[validErrors.message] : ""
          }
          value={email}
        />
        <Input
          style={styles.input}
          labelStyle={styles.label}
          label={translation.password + ":"}
          placeholder={translation["type-here"]}
          secureTextEntry={true}
          onChangeText={(value) => setpassword(value.trim())}
          errorMessage={
            validErrors.path === "password"
              ? translation[validErrors.message]
              : ""
          }
          value={password}
        />
      </Card>
      <View>
        <ButtonSyled
          bodyStyle={
            Dimensions.get("window").width > 600
              ? { ...media.btnB }
              : { ...media.btn }
          }
          textStyle={""}
          onPress={async () => handleLogin()}
        >
          {translation.login}
        </ButtonSyled>
      </View>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => props.navigation.navigate(AuthRoutes.ForgotPassword)}
      >
        <TextTitle style={styles.innerAlreadyText}>
          {translation["forgot-pass"]}
        </TextTitle>
      </TouchableOpacity>
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
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    color: colors.primary,
  },
  input: {
    textAlign: "center",
    borderColor: colors.fourth,
    borderBottomWidth: 0.5,
  },
  innerAlreadyText: {
    color: colors.fourth,
    textDecorationLine: "underline",
    fontSize: 18,
  },
  loginLink: {
    paddingBottom: 25,
  },
});
