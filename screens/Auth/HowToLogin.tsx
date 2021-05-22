import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FacebookLogin from "../../components/auth/FacebookLogin";
import { ButtonSyled } from "../../components/ButtonSyled";
import LineDevider from "../../components/LineDevider";
import TextBody from "../../components/TextBody";
import TextTitle from "../../components/TextTitle";
import colors from "../../constants/colors";
import { media } from "../../constants/responsiveStyle";
import useTranslation from "../../data/languages/translateLanguage";
import { AuthRoutes } from "../../navigation/routes";
import { AuthNavigationProp } from "../../navigation/types";

type LoginOptionsScreenProps = {
  navigation: AuthNavigationProp<AuthRoutes.HowToLogin>;
};

const HowToLogin: React.FC<LoginOptionsScreenProps> = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const translation = useTranslation();
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
          ? { ...styles.container, ...media.containerB }
          : { ...styles.container, ...media.container }
      }
    >
      <TextBody style={styles.title}>{translation["how-to-login"]}</TextBody>
      <FacebookLogin setisLoading={setisLoading} />
      <LineDevider bodyStyle={styles.lineContainer} lineStyle={styles.line}>
        <TextBody style={{ width: 50, textAlign: "center" }}>
          {translation.or}
        </TextBody>
      </LineDevider>
      <ButtonSyled
        bodyStyle={styles.regBtn}
        onPress={() => props.navigation.navigate(AuthRoutes.Login)}
        textStyle={styles.regBtnTxt}
      >
        {translation["login-email"]}
      </ButtonSyled>
      <View style={styles.alreadyContainer}>
        <TextTitle style={styles.alreadyText}>
          {translation["still-not-with-us"]}
        </TextTitle>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => props.navigation.navigate(AuthRoutes.Registeration)}
        >
          <TextBody style={styles.innerAlreadyText}>
            {translation.register + "!"}
          </TextBody>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HowToLogin;

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    flex: 0.8,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: colors.fourth,
    // opacity: 0.7,
    marginBottom: Dimensions.get("window").height * 0.05,
  },

  lineContainer: {
    marginHorizontal: 15,
    marginVertical: Dimensions.get("window").height * 0.02,
  },
  line: {
    backgroundColor: colors.third,
  },
  regBtn: {
    backgroundColor: colors.third,
    width: 300,
    maxWidth: "95%",
  },
  regBtnTxt: {
    color: colors.secondary,
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
