import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import MainScreen from '../Src/MainScreen';
import HomeScreen from '../Src/HomeScreen';
import SignInScreen from '../Src/SignInScreen';
import LoginScreen from '../Src/LoginScreen';
import MapScreen from '../Screens/MapScreen';
import FavoriteScreen from '../Screens/FavoriteScreen';
import UserProfile from '../Screens/UserProfile';
import Hotals from '../Utils/Hotals';
import DetailsScreen from '../Src/DetailsScreen';
import { AuthContext } from './AuthNavigation';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  const favoritesCount = useSelector(state => state.cart.favorites.length);


  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
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

function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Hotals"
        component={Hotals}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    // Logic to check if user is authenticated
    // You can use AsyncStorage, Redux, or any other method to get the auth state
    const checkAuth = async () => {
      // Example using AsyncStorage
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  return (
    <>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Home"
            component={StackNav}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigation}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </>
  );
}




export default App;
