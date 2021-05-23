import React, { useEffect } from "react";
import { Alert, BackHandler, Image, StyleSheet, View } from "react-native";
import { ButtonSyled } from "../../components/ButtonSyled";
import Card from "../../components/Card";
import TextTitle from "../../components/TextTitle";
import colors from "../../constants/colors";
import useTranslation from "../../data/languages/translateLanguage";
import { getObject, getValue } from "../../data/localStorage";
import { AuthRoutes } from "../../navigation/routes";
import { AuthNavigationProp } from "../../navigation/types";
import { setLanguage } from "../../redux/env/envSlice";
import { useReduxDispatch } from "../../redux/hooks";

type MainScreenProps = {
  navigation: AuthNavigationProp<AuthRoutes.Main>;
};

const Main: React.FC<MainScreenProps> = (props) => {
  const translation = useTranslation();

  const dispatch = useReduxDispatch();

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    const getLanguage = async () => {
      const language: any = await getValue("language");
      language && dispatch(setLanguage(language));
    };
    getLanguage();

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Image
          style={styles.img}
          source={{
            uri: "https://www.animatedimages.org/data/media/1038/animated-camper-and-rv-image-0014.gif",
          }}
        />
      </Card>

      <View style={styles.btnContainer}>
        <TextTitle style={styles.title}>{translation.greeting}</TextTitle>
        <ButtonSyled
          bodyStyle={styles.regBtn}
          onPress={() => props.navigation.navigate(AuthRoutes.Registeration)}
          textStyle={styles.regBtnTxt}
        >
          {translation.register}
        </ButtonSyled>
        <ButtonSyled
          bodyStyle={styles.loginBtn}
          onPress={() => props.navigation.navigate(AuthRoutes.HowToLogin)}
          textStyle={styles.loginBtnTxt}
        >
          {translation.login}
        </ButtonSyled>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: "center",
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
  img: {
    width: "95%",
    height: 50,
    marginLeft: 8,
    marginVertical: 5,
    maxWidth: "95%",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: colors.fourth,
    fontStyle: "italic",
  },
  btnContainer: {
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: colors.third,
    width: 300,
    maxWidth: "95%",
  },
  regBtn: {
    backgroundColor: colors.primary,
    width: 300,
    maxWidth: "95%",
  },
  loginBtnTxt: {
    color: colors.secondary,
  },
  regBtnTxt: {
    color: colors.secondary,
  },
});
