import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

interface ButtonProps {
  children: any;
  onPress: () => void;
  bodyStyle: any;
  textStyle: any;
}

export const ButtonSyled: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity {...props} onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.bodyStyle }}>
        <Text style={{ ...styles.buttonText, ...props.textStyle }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
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
