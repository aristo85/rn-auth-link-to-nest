import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import { setObject } from "../../data/localStorage";
import { setLanguage } from "../../redux/env/envSlice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { ButtonSyled } from "../ButtonSyled";
import TextTitle from "../TextTitle";

const LanguageHeader = () => {
  const dispatch = useReduxDispatch();
  const language = useReduxSelector((state) => state.env.language);
  return {
    headerTitle: () => (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          //   alignSelf: "center",
        }}
      >
        <ButtonSyled
          bodyStyle={styles.langBtn}
          textStyle={styles.langTxt}
          onPress={async () => {
            await setObject("language", {
              language: language === "ku" ? "en" : "ku",
            });
            dispatch(setLanguage(language === "ku" ? "en" : "ku"));
          }}
        >
          <TextTitle
            style={{
              color: colors.fourth,
              fontSize: 24,
              // textDecorationLine: "underline",
            }}
          >
            {language === "ku" ? "English" : "کوردی"}{" "}
          </TextTitle>
          <Image
            source={
              language === "en"
                ? require("../../assets/language/kflag.png")
                : require("../../assets/language/uk.png")
            }
            style={{
              height: 18,
              width: 30,
              borderRadius: 6,
              margin: 0
              // marginHorizontal: 2,
            }}
          />
        </ButtonSyled>
      </View>
    ),
  };
};

export default LanguageHeader;

const styles = StyleSheet.create({
  langBtn: {
    borderRadius: 5,
    paddingTop: 1,
    paddingBottom: 1,
    paddingHorizontal: 3,
    height: 45,
    backgroundColor: colors.secondary,
  },
  langTxt: {
    padding: 0,
    color: colors.third,
    marginTop: 1,
    marginBottom: 0,
    marginHorizontal: 3
  },
});
