import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface LineProps {
  children: any;
  bodyStyle: any;
  lineStyle: any;
}

const LineDevider: React.FC<LineProps> = (props) => {
  return (
    <View style={{ ...styles.container, ...props.bodyStyle }}>
      <View style={{ ...styles.line, ...props.lineStyle }} />
      <View>{props.children}</View>
      <View style={{ ...styles.line, ...props.lineStyle }} />
    </View>
  );
};

export default LineDevider;

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  line: { flex: 1, height: 1, backgroundColor: "black" },
});
