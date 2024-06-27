import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit() {
    const UserData = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
    };

    if (!name || !email || !password || !confirmPassword || !mobile) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert('Error', 'Please enter a proper phone number.');
      return;
    }

    axios
      .post('http://localhost:3000/api/auth/signup', UserData)
      .then(res => {
        console.log(res.data);
        Alert.alert('Success', 'Account created successfully!');
      })
      .catch(e => {
        console.log(e, 'Error');
        Alert.alert('Error', 'There was an error creating your account.');
      });
  }

  return (
    <ScrollView>
      <View style={{marginLeft: 20, marginRight: 20, marginTop: '30%'}}>
        <View style={{marginTop: 0}}>
          <TouchableOpacity></TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <Text>
            <Text
              style={{
                fontSize: 40,
                fontFamily: 'Lato-Bold',
                fontWeight: '700',
                color: '#000',
                lineHeight: 50,
              }}>
              Welcome Back!
            </Text>
          </Text>
        </View>
        <View style={{marginTop: 25, height: 300, gap: 20}}>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Name"
            paddingLeft={20}
            backgroundColor={'#F6F5FA'}
            placeholderTextColor={'black'}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gmail"
            paddingLeft={20}
            backgroundColor={'#F6F5FA'}
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'black'}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            paddingLeft={20}
            backgroundColor={'#F6F5FA'}
            placeholderTextColor={'black'}
            onChangeText={text => setMobile(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'black'}
            paddingLeft={20}
            backgroundColor={'#F6F5FA'}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            selectTextOnFocus
            paddingLeft={20}
            placeholderTextColor={'black'}
            backgroundColor={'#F6F5FA'}
            onChangeText={text => setConfirmPassword(text)}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.loginRedirect}>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            If already have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={{color: '#EA9F5A', fontSize: 20}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderRightWidth: 0.2,
    borderLeftWidth: 0.2,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: '#EA9F5A',
    borderRadius: 10,
    borderColor: '#EA9F5A',
    borderWidth: 0.5,
    height: 50,
    marginTop: 200,
  },
  submitButtonText: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 14,
    color: '#fff',
    fontFamily: 'Raleway-ExtraBold',
    fontSize: 20,
  },
  loginRedirect: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
