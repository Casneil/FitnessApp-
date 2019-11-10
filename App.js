import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider
} from "react-native";
import AddEntry from "./components/AddEntry";
import { getState } from "expect/build/jestMatchersObject";

const App = () => {
  const [value, setValue] = useState(0);

  handlePress = () => {
    alert("Hello");
  };

  return (
    <View style={styles.container}>
      {/* <TouchableHighlight onPress={handlePress} underlayColor="black">
        <Text style={styles.btn}>Touchable Highlight</Text>
      </TouchableHighlight> */}

      <AddEntry />

      {/* 
      // TEST SLIDER
      <Slider
        minimumValue={-10}
        maximumValue={10}
        step={1}
        value={value}
        onValueChange={value => setValue(value)}
      <Text>Value: {value}</Text>
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",

    justifyContent: "center"
  },
  btn: {
    backgroundColor: "green",
    padding: 10,
    paddingRight: 50,
    paddingLeft: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});

export default App;
