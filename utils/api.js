import { AsyncStorage } from "react-native";
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from "./_calender";

export function SubmitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({
      [key]: entry
    })
  );
}

export function RemoveEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}

export function fetchCalenderResults() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(formatCalendarResults);
}
