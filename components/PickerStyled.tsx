import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import LineDevider from "./LineDevider";
import TextTitle from "./TextTitle";
import colors from "../constants/colors";

interface PickerProps {
  items: any[];
  defaultItem: any;
  setValue: (item: any) => void;
  value: any;
}

const PickerStyled: React.FC<PickerProps> = (props) => {
  // const [value, setValue] = React.useState(props.defaultItem);
  return (
    <View style={{width: 330}}>
      <Picker
        selectedValue={props.value}
        onValueChange={(v) => props.setValue(v)}
        mode="dropdown"
        style={styles.picker}
      >
        {props.items.map((el) => (
          <Picker.Item key={el} label={"" + el} value={el} />
        ))}
      </Picker>
      <LineDevider bodyStyle={styles.lineContainer} lineStyle={{}}>
        <Text>{""}</Text>
      </LineDevider>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    // marginBottom: -10,
    // marginHorizontal: -20,
  },
  lineContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    // width: "100%"
  },
});

export default PickerStyled;
