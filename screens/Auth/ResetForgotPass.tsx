import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Input } from "react-native-elements";
import ResetForgotPassModal from "../../components/auth/ResetForgotPassModal";
import { ButtonSyled } from "../../components/ButtonSyled";
import Card from "../../components/Card";
import MyAlert from "../../components/MyAlert";
import TextTitle from "../../components/TextTitle";
import colors from "../../constants/colors";
import { media } from "../../constants/responsiveStyle";
import useTranslation from "../../data/languages/translateLanguage";
import { confirmForgotPassword } from "../../redux/env/thunk/auth";
import { ResetCodeForgotPass } from "../../redux/env/types";
import { useReduxDispatch } from "../../redux/hooks";

const ResetForgotPass = () => {
  const [confirmCodeModal, setconfirmCodeModal] =
    useState<false | ResetCodeForgotPass>(false);
  const [resetCode, setresetCode] = useState("");
  const [serverErr, setserverErr] = useState();
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useReduxDispatch();
  const translation = useTranslation();

  const onSendCode = async () => {
    const codeData: { resetCode: number } = { resetCode: +resetCode };
    setisLoading(true);
    setserverErr(undefined);

    const response = await dispatch(confirmForgotPassword(codeData));

    if (confirmForgotPassword.fulfilled.match(response)) {
      setisLoading(false);
      const resData = response.payload;
      setconfirmCodeModal(resData);
    } else {
      setisLoading(false);
      setserverErr(response.payload);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
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
              ? media.containerB
              : { ...styles.container, ...media.container }
          }
        >
          <TextTitle style={{ fontSize: 16, color: colors.primary }}>
            {translation["we-sent-reset-forgot-pass-code"]}
          </TextTitle>

          <Card style={styles.card}>
            <Input
              style={{ textAlign: "center" }}
              labelStyle={styles.label}
              label={translation["insert-reset-forgot-pass"] + ":"}
              placeholder={translation["type-here"]}
              onChangeText={(value) => setresetCode(value)}
              errorMessage={""}
              value={resetCode}
              inputContainerStyle={{ borderBottomColor: colors.fourth }}
            />
            <ButtonSyled
              bodyStyle={styles.regBtn}
              onPress={() => onSendCode()}
              textStyle={styles.regBtnTxt}
            >
              {translation.send}
            </ButtonSyled>
          </Card>
        </View>
      )}
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
      <ResetForgotPassModal
        isVisible={confirmCodeModal}
        setVisible={setconfirmCodeModal}
      />
    </ScrollView>
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
  card: {
    marginBottom: 20,
    alignItems: "center",
  },
  regBtn: {
    backgroundColor: colors.third,
    width: 300,
    maxWidth: "95%",
  },
  regBtnTxt: {
    color: colors.secondary,
  },
  label: {
    color: colors.third,
  },
});

export default ResetForgotPass;
