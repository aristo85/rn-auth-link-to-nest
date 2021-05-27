import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { ButtonSyled } from "../../components/ButtonSyled";
import Card from "../../components/Card";
import MyAlert from "../../components/MyAlert";
import TextBody from "../../components/TextBody";
import colors from "../../constants/colors";
import { media } from "../../constants/responsiveStyle";
import useTranslation from "../../data/languages/translateLanguage";
import * as yup from "yup";
import { AuthNavigationProp } from "../../navigation/types";
import { AuthRoutes } from "../../navigation/routes";
import { forgotPassword } from "../../redux/env/thunk/auth";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";

type ValidEr = {
  path: string;
  message: "" | "email-must-be-valid" | "email-required";
};

let schema = yup.object().shape({
  email: yup.string().email("email-must-be-valid").required("email-required"),
});

type ForgotPassScreenProps = {
  navigation: AuthNavigationProp<AuthRoutes.ForgotPassword>;
};

const ForgotPassword: React.FC<ForgotPassScreenProps> = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState<string>("");
  const [validErrors, setValidErrors] = useState<ValidEr>({
    path: "",
    message: "",
  });
  const [serverErr, setserverErr] = useState<string>();

  const dispatch = useReduxDispatch();
  const translation = useTranslation();

  const onSendEmail = async () => {
    setisLoading(true);
    const confiramtionEmail = { email };
    try {
      const isValid = await schema.isValid({
        ...confiramtionEmail,
      });

      if (isValid) {
        setValidErrors({ path: "", message: "" });
        const response = await dispatch(forgotPassword(confiramtionEmail));

        if (forgotPassword.fulfilled.match(response)) {
          props.navigation.navigate(AuthRoutes.ResetForgotPass);
        } else {
          setisLoading(false);
          setserverErr(response.payload);
        }
      }
      // otherwise if not valid add the error to the error list
      await schema.validate({
        ...confiramtionEmail,
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
      <TextBody style={styles.title}>
        {translation["forgot-pass-info-text-1"]}
      </TextBody>
      <TextBody style={styles.title}>
        {translation["forgot-pass-info-text-2"]}
      </TextBody>
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
      </Card>
      <View>
      </View>
      <ButtonSyled
        bodyStyle={
          Dimensions.get("window").width > 600
            ? { ...media.btnB, backgroundColor: colors.third }
            : { ...media.btn, backgroundColor: colors.third }
        }
        textStyle={""}
        onPress={async () => onSendEmail()}
      >
        {translation["confirm-email"]}
      </ButtonSyled>
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

export default ForgotPassword;

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
  title: {
    color: colors.primary,
    fontSize: 16,
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
});
