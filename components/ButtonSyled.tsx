import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import colors from "../constants/colors";

interface ButtonProps {
  children: string;
  onPress: () => void;
  bodyStyle: any;
  textStyle: any;
}

export const ButtonSyled: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      title={props.children}
      buttonStyle={{ ...styles.button, ...props.bodyStyle }}
      titleStyle={{ ...styles.buttonText, ...props.textStyle }}
      onPress={props.onPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    margin: 5,
  },
  buttonText: {
    color: colors.secondary,
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "center",
  },
});
