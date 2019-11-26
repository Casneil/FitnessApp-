import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";

import { white, grey, purple } from "../utils/colors";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const Steppers = ({ max, unit, step, onIncrement, onDecrement, value }) => {
  return (
    <View style={[styles.row, { justifyContent: "space-between" }]}>
      {Platform.OS === "ios" ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={
              (styles.iosButton,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 })
            }
            onPress={onDecrement}
          >
            <Entypo name="minus" size={30} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              (styles.iosButton,
              { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 })
            }
            onPress={onIncrement}
          >
            <Entypo name="plus" size={30} color={"black"} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.androidButton} onPress={onDecrement}>
            <FontAwesome name="minus" size={30} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.androidButton} onPress={onIncrement}>
            <FontAwesome name="plus" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.metricCounter}>
        <Text style={{ FontSize: 25, textAlign: "center" }}>{value}</Text>
        <Text style={{ FontSize: 18, color: grey }}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosButton: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  metricCounter: {
    width: 85,
    justifyContent: "center",
    alignItems: "center"
  },
  androidButton: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2
  }
});

export default Steppers;
