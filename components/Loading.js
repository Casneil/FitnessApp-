import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Loading = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loading;

styles = StyleSheet.create({
  text: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 40
  }
});
