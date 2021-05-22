import React from "react";
import { View, StyleSheet } from "react-native";

interface CardProps {
  children: React.FC | any;
  style: any;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 15,
    shadowRadius: 6,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export default Card;
