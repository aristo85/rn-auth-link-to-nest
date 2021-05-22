import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ButtonSyled } from "../../components/ButtonSyled";
import colors from "../../constants/colors";
import useTranslation from "../../data/languages/translateLanguage";
import { AuthRoutes } from "../../navigation/routes";
import { AuthNavigationProp } from "../../navigation/types";
import { FontAwesome } from "@expo/vector-icons";
import LineDevider from "../../components/LineDevider";
import TextBody from "../../components/TextBody";
import RegistrationForm from "../../components/auth/RegistrationForm";
import { ScrollView } from "react-native-gesture-handler";
import TextTitle from "../../components/TextTitle";
import FacebookLogin from "../../components/auth/FacebookLogin";

type RegScreenProps = {
  navigation: AuthNavigationProp<AuthRoutes.Registeration>;
};

const Registeration: React.FC<RegScreenProps> = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const translation = useTranslation();

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={colors.primary}
      style={styles.spiner}
    />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <FacebookLogin setisLoading={setisLoading} />
      <LineDevider bodyStyle={styles.lineContainer} lineStyle={styles.line}>
        <TextBody style={{ width: 50, textAlign: "center" }}>
          {translation.or}
        </TextBody>
      </LineDevider>
      <RegistrationForm />
      <View style={styles.alreadyContainer}>
        <TextTitle style={styles.alreadyText}>
          {translation["already-have-account"]}
        </TextTitle>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => props.navigation.navigate(AuthRoutes.HowToLogin)}
        >
          <TextTitle style={styles.innerAlreadyText}>
            {translation.login}
          </TextTitle>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Registeration;

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    paddingBottom: 15,
  },
  card: {
    alignSelf: "center",
    borderRadius: 20,
    maxWidth: "95%",
    width: 200,
    marginTop: 30,
    borderColor: colors.fourth,
    borderWidth: 1,
    marginBottom: 50,
  },
  fbBtn: {
    backgroundColor: colors.primary,
    width: 300,
    maxWidth: "95%",
  },
  fbBtnTxt: {
    color: colors.secondary,
  },
  lineContainer: {
    marginHorizontal: 15,
  },
  line: {
    backgroundColor: colors.third,
  },
  alreadyContainer: {
    marginTop: 30,
  },
  alreadyText: {
    fontSize: 18,
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
