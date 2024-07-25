import React, {useState,useContext} from 'react';
import {View, TextInput, Alert, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Navigation/AuthNavigation';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useContext(AuthContext)

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }

    axios
      .post('http://localhost:3000/api/auth/signin', {email, password})
      .then(response => {
        console.log('User signed in!');
        navigation.replace('Home');
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          Alert.alert('Error', 'Invalid credentials, please sign up.');
          navigation.navigate('SignUpScreen', {email, password});
        } else {
          Alert.alert('Error', error.message);
        }
        console.error(error);
      });
  };

  return (
    <View style={{marginLeft: 20, marginRight: 20, marginTop: '20%'}}>
      {/* <View style={{marginTop: 0}}>
        <TouchableOpacity onPress={() => navigation.goBack('BoardingScreen')}>
          <AntDesign name={'left'} size={30} />
        </TouchableOpacity>
      </View> */}
      <View style={{marginTop: 20}}>
        <Text>{user}</Text>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '700',
            color: '#000',
            lineHeight: 50,
          }}>
          Welcome Back!
        </Text>
      </View>
      <Text style={{fontSize: 20}}>Sign in to your account</Text>
      <View style={{marginTop: 65, height: 200, gap: 20}}>
        <TextInput
          style={styles.input}
          placeholder="Gmail"
          paddingLeft={20}
          backgroundColor={'#F6F5FA'}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          paddingLeft={20}
          backgroundColor={'#F6F5FA'}
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 20, marginTop: 50, textAlign: 'center'}}>
        Or Continue With
      </Text>
      <TouchableOpacity style={styles.gmailButton}>
        <Text style={styles.gmailButtonText}>Gmail</Text>
      </TouchableOpacity>
      <View style={styles.signupRedirectContainer}>
        <Text>Not Yet Member?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupRedirectLink}>Join Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  input: {
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderRightWidth: 0.2,
    borderLeftWidth: 0.2,
    borderRadius: 20,
    height: 60,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#EA9F5A',
    borderRadius: 10,
    borderColor: '#EA9F5A',
    borderWidth: 0.5,
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Raleway-ExtraBold',
  },
  gmailButton: {
    backgroundColor: '#CF2D48',
    borderRadius: 10,
    borderColor: '#EA9F5A',
    borderWidth: 2,
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gmailButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Raleway-ExtraBold',
  },
  signupRedirectContainer: {
    marginTop: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signupRedirectLink: {
    color: '#EA9F5A',
    marginLeft: 5,
  },
};

export default SignInScreen;
