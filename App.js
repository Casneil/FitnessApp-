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
      <AddEntry />
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
