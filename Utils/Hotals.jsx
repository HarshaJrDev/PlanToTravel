import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const App = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [guestCategory, setGuestCategory] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [guests, setGuests] = useState({ kids: 0, children: 0, adults: 0 });

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Reset end date when a new start date is selected
    }
  };

  const startDate = selectedStartDate ? selectedStartDate.toString().slice(0, 15) : "";
  const endDate = selectedEndDate ? selectedEndDate.toString().slice(0, 15) : "";

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const incrementCount = (category) => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [category]: prevGuests[category] + 1,
    }));
  };

  const decrementCount = (category) => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [category]: prevGuests[category] > 0 ? prevGuests[category] - 1 : 0,
    }));
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearch = () => {
    // Handle search functionality here
    console.log("Search button pressed");
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <TextInput
          style={styles.dateInput}
          placeholder="Select Date Range"
          value={startDate && endDate ? `${startDate} to ${endDate}` : ""}
        />
        <View style={styles.calendarIcon}>
          <TouchableOpacity onPress={toggleCalendar}>
            <MaterialCommunityIcons name="calendar" size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={calendarVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={new Date(2020, 1, 1)}
            maxDate={new Date(2050, 6, 3)}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor='rgb(255, 127, 62)'
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
          />
          <View>
            <Text>ARRIVAL DATE: {startDate}</Text>
            <Text>DEPARTURE DATE: {endDate}</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={toggleCalendar}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownToggle}>
        <Text style={styles.dropdownText}>
          {guestCategory ? `Guests: ${guestCategory}` : "Select Guests"}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={25} />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          {["Kids", "Children", "Adults"].map((category) => (
            <View key={category} style={styles.guestCategory}>
              <Text style={styles.guestLabel}>{category}</Text>
              <View style={styles.counter}>
                <TouchableOpacity onPress={() => decrementCount(category.toLowerCase())}>
                  <MaterialCommunityIcons name="minus-circle" size={25} />
                </TouchableOpacity>
                <Text style={styles.count}>{guests[category.toLowerCase()]}</Text>
                <TouchableOpacity onPress={() => incrementCount(category.toLowerCase())}>
                  <MaterialCommunityIcons name="plus-circle" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  
    backgroundColor: "#f5f5f5",
  },
  dateInput: {
    backgroundColor: "rgb(253,253,253)",
    width: 360,
    height: 50,
    borderRadius: 10,
    paddingLeft: 50,
    elevation: 10,
    shadowOpacity: 0.1,
  },
  calendarIcon: {
    zIndex: 10,
    left: -350,
    marginTop: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'rgb(255, 127, 62)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  dropdownToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(253,253,253)",
    width: 360,
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 10,
    shadowOpacity: 0.1,
    marginTop: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownContainer: {
    backgroundColor: "rgb(253,253,253)",
    borderRadius: 10,
    elevation: 10,
    shadowOpacity: 0.1,
    padding: 20,
    marginTop: 10,
  },
  guestCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  guestLabel: {
    fontSize: 18,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  searchButton: {
    backgroundColor:'rgb(255, 127, 62)',
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default App;
