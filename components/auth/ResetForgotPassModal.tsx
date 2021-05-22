import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Input } from "react-native-elements";
import colors from "../../constants/colors";
import { media } from "../../constants/responsiveStyle";
import useTranslation from "../../data/languages/translateLanguage";
import { newPassOnForgotPass } from "../../redux/env/thunk/auth";
import { ResetCodeForgotPass, ResetForgotPass } from "../../redux/env/types";
import { useReduxDispatch } from "../../redux/hooks";
import { ButtonSyled } from "../ButtonSyled";
import Card from "../Card";
import MyAlert from "../MyAlert";
import TextTitle from "../TextTitle";
import * as yup from "yup";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

type Errmsg = "" | "pass-required" | "at-least-six" | "pass-must-match";

type ValidEr = {
  path: string;
  message: Errmsg;
};

let schema = yup.object().shape({
  password: yup.string().required("pass-required").min(6, "at-least-six"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password"), null], "pass-must-match"),
});

interface ModalProps {
  isVisible: ResetCodeForgotPass | false;
  setVisible: (a: false) => void;
}

const ResetForgotPassModal: React.FC<ModalProps> = (props) => {
  const [newPass, setnewPass] = useState("");
  const [confirmNewPass, setconfirmNewPass] = useState("");
  const [serverErr, setserverErr] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [validErrors, setValidErrors] = useState<ValidEr>({
    path: "",
    message: "",
  });

  const dispatch = useReduxDispatch();
  const translation = useTranslation();

  const onSendNewPassword = async () => {
    setisLoading(true);
    setserverErr(undefined);
    const newPassData: ResetForgotPass = {
      newPassword: newPass,
      email: props.isVisible ? props.isVisible.email : "",
      resetCode: props.isVisible ? props.isVisible.resetCode : 0,
    };
    try {
      const isValid = await schema.isValid({
        password: newPass,
        confirmPass: confirmNewPass,
      });
      if (isValid) {
        setValidErrors({ path: "", message: "" });
        const response = await dispatch(newPassOnForgotPass(newPassData));

        if (!newPassOnForgotPass.fulfilled.match(response)) {
          setisLoading(false);
          setserverErr(response.payload);
        }
      }
      // otherwise if not valid add the error to the error list
      await schema.validate({
        password: newPass,
        confirmPass: confirmNewPass,
      });
      setisLoading(false);
    } catch (err) {
      const { path, message } = err;
      setValidErrors({ path, message });
      setisLoading(false);
    }
  };

  return (
    // <TouchableWithoutFeedback
    //   onPress={() => Keyboard.dismiss()}
    //   containerStyle={{ flex: 1 }}
    // >
    <Modal visible={props.isVisible && true}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.spiner}
          />
        ) : (
          <View
            style={
              Dimensions.get("window").width > 600
                ? { ...media.container, ...media.containerB }
                : { ...styles.container, ...media.container }
            }
          >
            <TextTitle style={styles.title}>
              {translation["insert-new-password-forgot"]}
            </TextTitle>

            <Card
              style={
                Dimensions.get("window").width > 600
                  ? { ...styles.card, ...media.containerB }
                  : { ...styles.card, ...media.container }
              }
            >
              <Input
                style={styles.inputStyle}
                labelStyle={styles.label}
                label={translation["new-password"]}
                placeholder={translation["type-password"]}
                secureTextEntry={true}
                onChangeText={(value) => setnewPass(value.trim())}
                inputContainerStyle={{ borderBottomColor: colors.fourth }}
                errorMessage={
                  validErrors.path === "password"
                    ? translation[validErrors.message]
                    : ""
                }
                value={newPass}
              />
              <Input
                style={styles.inputStyle}
                labelStyle={styles.label}
                label={translation["confirm-new-password"]}
                placeholder={translation["repeat-password"]}
                secureTextEntry={true}
                onChangeText={(value) => setconfirmNewPass(value.trim())}
                inputContainerStyle={{ borderBottomColor: colors.fourth }}
                errorMessage={
                  validErrors.path === "confirmPass"
                    ? translation[validErrors.message]
                    : ""
                }
                value={confirmNewPass}
              />
            </Card>
            <ButtonSyled
              bodyStyle={styles.regBtn}
              onPress={() => onSendNewPassword()}
              textStyle={styles.regBtnTxt}
            >
              {translation.reset}
            </ButtonSyled>
          </View>
        )}
      </ScrollView>

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
    </Modal>
    // </TouchableWithoutFeedback>
  );
};

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
    alignSelf: "center",
  },
  title: { fontSize: 16, color: colors.primary, marginBottom: 30 },
  card: {
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  regBtn: {
    backgroundColor: colors.primary,
    width: 300,
    maxWidth: "95%",
  },
  regBtnTxt: {
    color: colors.secondary,
  },
  label: {
    color: colors.third,
  },
  inputStyle: {
    // textAlign: "center",
  },
});

export default ResetForgotPassModal;
