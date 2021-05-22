import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";

interface InputProps {
  style: any;
}

const InputStyled: React.FC<InputProps> = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: colors.fourth,
    borderBottomWidth: 1,
  },
});

export default InputStyled;
