import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import TextTitle from "./TextTitle";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface CollapseProps {
  children: any;
  style: any;
}

const CollapseItem: React.FC<CollapseProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <TouchableOpacity
        style={styles.totalContainer}
        onPress={() => setIsOpen(!isOpen)}
      >
        <TextTitle style={{}}>Additional options</TextTitle>
        <Ionicons
          name={
            isOpen
              ? Platform.OS === "android"
                ? "md-arrow-up"
                : "ios-arrow-up"
              : Platform.OS === "android"
              ? "md-arrow-down"
              : "ios-arrow-down"
          }
          size={25}
          color={colors.fourth}
        />
      </TouchableOpacity>

      {isOpen && <View>{props.children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
    padding: 10,
    alignSelf: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
});

export default CollapseItem;
