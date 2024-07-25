import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigation/Stacknavigation';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { AuthProvider } from './Navigation/AuthNavigation'; // Ensure correct path to your AuthProvider

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
