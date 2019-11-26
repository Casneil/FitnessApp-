import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider,
  Platform
} from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";

import AddEntry from "./components/AddEntry";
import { getState } from "expect/build/jestMatchersObject";

const App = () => {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <AddEntry />
      </View>
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//     alignItems: "stretch",
//     backgroundColor: "#fff",

//     justifyContent: "center"
//   },
//   btn: {
//     backgroundColor: "green",
//     padding: 10,
//     paddingRight: 50,
//     paddingLeft: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5
//   }
// });

export default App;
