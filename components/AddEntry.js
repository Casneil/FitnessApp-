import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { addEntries } from "../actions";

import Steppers from "./Steppers";
import Slidders from "./Slidders";
import DateHeader from "./DateHeader";
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue
} from "../utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { RemoveEntry, SubmitEntry } from "../utils/api";
import { white, purple } from "../utils/colors";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios"
          ? styles.iosSubmitButton
          : styles.androidSubmitButton
      }
      onPress={onPress}
    >
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
  );
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };
  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.props.dispatch(
      addEntries({
        [key]: entry
      })
    );

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }));

    // Navigagte to home

    SubmitEntry({ key, entry });

    // Clear local notification
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(state => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric).step;
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }));
  };

  reset = () => {
    const key = timeToString();
    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderValue()
      })
    );
    // Route to home
    RemoveEntry(key);
  };
  render() {
    const metaInfo = getMetricMetaInfo();
    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ion-ios-happy-outline" size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <DateHeader date={new Date().toLocaleDateString()} />

        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === "slider" ? (
                <Slidders
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <Steppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosSubmitButton: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitButton: {
    backgroundColor: purple,
    padding: 10,
    // paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    alignSelf: "flex-end",
    height: 45,
    justifyContent: "center",
    alignItems: "center"
    // marginLeft: 40,
    // marginRight: 40
  },
  submitButtonText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});

function maoStateToProps(state) {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined"
  };
}

export default connect(maoStateToProps)(AddEntry);
