import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { addEntries, recieveEntries } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalenderResults } from "../utils/api";
import UdaciFitnessCalendar from "udacifitness-calendar";
import { white } from "../utils/colors";
import DateHeader from "./DateHeader";

class History extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    fetchCalenderResults()
      .then(entries => dispatch(recieveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntries({
              [timeToString()]: getDailyReminderValue()
            })
          );
        }
      });
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <Text>{JSON.stringify(today)}</Text>
      ) : (
        <Text>{JSON.stringify(metrics)}</Text>
      )}
    </View>
  );

  renderEmptyDate(formattedDate) {
    return (
      <View>
        <Text>No data for this day</Text>
      </View>
    );
  }
  render() {
    const { entries } = this.props;
    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

function mapStateToProps(entries) {
  return {
    entries
  };
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});
export default connect(mapStateToProps)(History);
