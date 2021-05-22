import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Input } from "react-native-elements";
import colors from "../../constants/colors";
import useTranslation from "../../data/languages/translateLanguage";
import PickerStyled from "../PickerStyled";
import TextTitle from "../TextTitle";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { ButtonSyled } from "../ButtonSyled";
import * as yup from "yup";
import Card from "../Card";
import { requestCreateUser } from "../../redux/env/thunk/auth";
import MyAlert from "../MyAlert";
import ActivationCodeModal from "./ActivationCodeModal";

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

type Gender = "female" | "male";

type Errmsg =
  | ""
  | "name-required"
  | "at-least-three"
  | "email-must-be-valid"
  | "email-required"
  | "pass-required"
  | "at-least-six"
  | "pass-must-match";

type ValidEr = {
  path: string;
  message: Errmsg;
};

let schema = yup.object().shape({
  name: yup.string().required("name-required").min(3, "at-least-three").trim(),
  surname: yup.string(),
  email: yup.string().email("email-must-be-valid").required("email-required"),
  password: yup.string().required("pass-required").min(6, "at-least-six"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password"), null], "pass-must-match"),
});

interface RegFormProps {}

const RegistrationForm: React.FC<RegFormProps> = (props) => {
  const [activateCodeModal, setactivateCodeModal] = useState<boolean>(false);
  const [openForm, setopenForm] = useState<boolean>();
  const [name, setname] = useState<string>("");
  const [surname, setsurname] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [gender, setgender] = useState<Gender>("female");
  const [birthYear, setbirthYear] = useState<number>(1999);
  const [password, setpassword] = useState<string>("");
  const [confirmPass, setconfirmPass] = useState<string>("");
  const [validErrors, setValidErrors] = useState<ValidEr>({
    path: "",
    message: "",
  });
  const [serverErr, setserverErr] = useState();
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useReduxDispatch();
  const language = useReduxSelector((state) => state.env.language);
  const translation = useTranslation();

  const onCancelAlert = () => {
    setserverErr(undefined);
  };

  const onRegByEmail = async () => {
    if (!openForm) {
      setopenForm(true);
      return;
    }
    setisLoading(true);
    const regData = {
      name: name.trim(),
      surname,
      email,
      gender,
      birthYear,
      password,
      confirmPass,
    };
    try {
      const isValid = await schema.isValid({
        ...regData,
      });
      if (isValid) {
        setValidErrors({ path: "", message: "" });
        const response = await dispatch(requestCreateUser(regData));

        if (requestCreateUser.fulfilled.match(response)) {
          setisLoading(false);
          const resData = response.payload;
          setactivateCodeModal(true);
        } else {
          setisLoading(false);
          setserverErr(response.payload);
        }
        // props.navigation.navigate("shop");
      }
      // otherwise if not valid add the error to the error list
      await schema.validate({
        ...regData,
      });
      setisLoading(false);
    } catch (err) {
      const { path, message } = err;
      setValidErrors({ path, message });
      setisLoading(false);
      // setIsLoading(false);
    }
  };

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={colors.primary}
      style={styles.spiner}
    />
  ) : (
    <View
      style={
        Dimensions.get("window").width > 600
          ? styles.containerB
          : styles.container
      }
    >
      {openForm && (
        <Card style={styles.card}>
          <Input
            style={styles.inputStyle}
            labelStyle={styles.label2}
            label={translation.name}
            placeholder={translation["your-name"]}
            onChangeText={(value) => setname(value)}
            errorMessage={
              validErrors.path === "name"
                ? translation[validErrors.message]
                : ""
            }
            value={name}
          />
          {/* <Input
            label={translation.surname}
            placeholder={translation["your-surname"]}
            onChangeText={(value) => setsurname(value)}
          /> */}
          <Input
            style={styles.inputStyle}
            labelStyle={styles.label2}
            label={translation["e-mail"]}
            placeholder={translation["type-valid-email"]}
            onChangeText={(value) => setemail(value.trim())}
            errorMessage={
              validErrors.path === "email"
                ? translation[validErrors.message]
                : ""
            }
            value={email}
          />
          <View style={{ width: 300 }}>
            <TextTitle
              style={{
                ...styles.label,
                textAlign: language === "en" ? "left" : "right",
              }}
            >
              {translation.gender}
            </TextTitle>
            <PickerStyled
              items={["male", "female"]}
              defaultItem="female"
              setValue={setgender}
              value={gender}
            />
          </View>
          <View style={{ width: 300 }}>
            <TextTitle
              style={{
                ...styles.label,
                textAlign: language === "en" ? "left" : "right",
              }}
            >
              {translation["birth-year"]}
            </TextTitle>
            <PickerStyled
              items={range(1920, 2005, 1)}
              defaultItem={1999}
              setValue={setbirthYear}
              value={birthYear}
            />
          </View>
          <Input
            style={styles.inputStyle}
            labelStyle={styles.label2}
            label={translation.password}
            placeholder={translation["type-password"]}
            secureTextEntry={true}
            onChangeText={(value) => setpassword(value.trim())}
            errorMessage={
              validErrors.path === "password"
                ? translation[validErrors.message]
                : ""
            }
            value={password}
          />
          <Input
            style={styles.inputStyle}
            labelStyle={styles.label2}
            label={translation["confirm-password"]}
            placeholder={translation["repeat-password"]}
            secureTextEntry={true}
            onChangeText={(value) => setconfirmPass(value.trim())}
            errorMessage={
              validErrors.path === "confirmPass"
                ? translation[validErrors.message]
                : ""
            }
            value={confirmPass}
          />
        </Card>
      )}

      <ButtonSyled
        bodyStyle={styles.regBtn}
        onPress={() => onRegByEmail()}
        textStyle={styles.regBtnTxt}
      >
        {translation["email-reg"]}
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
          onDismiss={() => onCancelAlert()}
          onCancel={() => onCancelAlert()}
        />
      )}
      <ActivationCodeModal
        isVisible={activateCodeModal}
        setVisible={setactivateCodeModal}
      />
    </View>
  );
};

export default RegistrationForm;

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    width: "90%",
    maxWidth: "95%",
    alignItems: "center",
  },
  containerB: {
    width: 600,
    maxWidth: "90%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: colors.primary,
    marginRight: -25,
  },
  regBtn: {
    backgroundColor: colors.third,
    width: 300,
    maxWidth: "95%",
  },
  regBtnTxt: {
    color: colors.secondary,
  },
  label2: {
    color: colors.primary,
  },
  inputStyle: {
    textAlign: "center",
  },
});
