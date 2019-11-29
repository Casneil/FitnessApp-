import React, { Component } from "react";
import { View, Text } from "react-native";
import {connect } from 'react-rdux'
import from {addEntries, recieveEntries} "../actions"
import {timeToString, getDailyReminderValue} from '../utils/helpers'
import {fetchCalenderResults} from '../utils/api'

class History extends Component {
  componentWillMount(){
    const  {dispatch} = this.this.props

    fetchCalenderResults()
    .then((entries) => (
      dispatch(recieveEntries(entries))
    ))
    .then (({entries}) => {
      if (!entries[timeToString()]) {
        dispatch(addEntries ({
          [timeToString()]: getDailyReminderValue()
        }))
      }
    })
  }
  render() {
    return (
      <View>
        <Text>History</Text>
      </View>
    );
  }
}


function mapStateToProps (entries) {
  return (
    entries
  )
} 
export default connect(mapStateToProps) ( History) ;
