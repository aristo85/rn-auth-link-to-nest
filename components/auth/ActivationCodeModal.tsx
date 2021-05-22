import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import { Input } from "react-native-elements/dist/input/Input";
import colors from "../../constants/colors";
import { ButtonSyled } from "../ButtonSyled";
import Card from "../Card";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { confirmAccount } from "../../redux/env/thunk/auth";
import MyAlert from "../MyAlert";
import useTranslation from "../../data/languages/translateLanguage";
import { media } from "../../constants/responsiveStyle";
import TextTitle from "../TextTitle";

export type ActivateAccCode = { activationCode: number };

interface ModalProps {
  isVisible: boolean;
  setVisible: (a: boolean) => void;
}

const ActivationCodeModal: React.FC<ModalProps> = (props) => {
  const [accConfCode, setaccConfCode] = useState("");
  const [serverErr, setserverErr] = useState();
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useReduxDispatch();
  const translation = useTranslation();

  const onSendCode = async () => {
    const codeData: ActivateAccCode = { activationCode: +accConfCode };
    setisLoading(true);
    setserverErr(undefined);
    const response = await dispatch(confirmAccount(codeData));

    if (!confirmAccount.fulfilled.match(response)) {
      setisLoading(false);
      setserverErr(response.payload);
    }
  };

  return (
    <Modal visible={props.isVisible}>
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
          <TextTitle style={{ fontSize: 16, color: colors.fourth }}>
            {translation["we-sent-vrify-account-code"]}
          </TextTitle>

          <Card style={styles.card}>
            <Input
              style={{ textAlign: "center" }}
              labelStyle={styles.label}
              label={translation["insert-verify-code"]}
              placeholder={translation["type-here"]}
              onChangeText={(value) => setaccConfCode(value)}
              errorMessage={""}
              value={accConfCode}
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
    </Modal>
  );
};

export default ActivationCodeModal;

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
    backgroundColor: colors.primary,
    width: 300,
    maxWidth: "95%",
  },
  regBtnTxt: {
    color: colors.secondary,
  },
  label: {
    color: colors.primary,
  },
});
