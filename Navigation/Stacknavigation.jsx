import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../Src/MainScreen';
import HomeScreen from '../Src/HomeScreen';
import SignInScreen from '../Src/SignInScreen';
import LoginScreen from '../Src/LoginScreen';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapScreen from '../Screens/MapScreen';
import FavoriteScreen from '../Screens/FavoriteScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import UserProfile from '../Screens/UserProfile';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false, // This line removes the header for all screens in the tab navigator
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            return <Feather name={iconName} size={size} color={color} />;
          } else if (route.name === 'Map') {
            iconName = 'map';
            return (
              <SimpleLineIcons name={iconName} size={size} color={color} />
            );
          }else if (route.name === 'Map') {
            iconName = 'map';
            return (
              <SimpleLineIcons name={iconName} size={size} color={color} />
            );
          } else if (route.name === 'Save') {
            iconName = 'favorite-border';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'user-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'rgb(255, 127, 62)',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Save" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="HomeTabs" component={HomeTabNavigator} />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Drawer.Screen
        name="Sign In"
        component={SignInScreen}
        options={{title: 'Sign In'}}
      />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
}

export default App;
