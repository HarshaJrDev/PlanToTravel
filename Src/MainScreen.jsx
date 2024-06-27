import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const slides = [
  {
    key: 1,
    text: 'Make your own private travel plan',
    image: require('../../PlanToTravel/Assets/BoardingOne.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 2,
    text: 'Other cool stuff',
    image: require('../../PlanToTravel/Assets/BoardingTwo.png'),
  },
  {
    key: 3,
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../PlanToTravel/Assets/BoardingThree.png'),
  },
];

const App = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Icon name="chevron-right" color="rgba(255, 255, 255, .9)" size={24} />
    </View>
  );

  const renderDoneButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
      <View style={styles.buttonCircle}>
        <MaterialIcons name="done" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    </TouchableOpacity>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
    />
  );
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(0,0%,99.22%)',
  },
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginHorizontal: 40,
    fontFamily: 'Bold',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    resizeMode: 'contain',
  },
});

export default App;
