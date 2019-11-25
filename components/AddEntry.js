import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Steppers from "./Steppers";
import Slidders from "./Slidders";
import DateHeader from "./DateHeader";

import { getMetricMetaInfo, timeToString } from "../utils/helpers";

import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";

import { RemoveEntry, SubmitEntry } from "../utils/api";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}

export default class AddEntry extends Component {
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

    // Update redux

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
    // Update Redux
    // Route to home
    RemoveEntry(key);
  };
  render() {
    const metaInfo = getMetricMetaInfo();
    if (true) {
      return (
        <View>
          <Ionicons name="ion-ios-happy-outline" size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }
    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />

        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
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
