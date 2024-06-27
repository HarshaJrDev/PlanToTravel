import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useRef } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CetagoryScreen from './CetagoryScreen';

const HomeScreen = () => {
  const navigation = useNavigation()
  const input = useRef();

  const Uppdate = () => {
    input.current.focus();
    input.current.blur();
    console.log(input.current);
  };

  return (
    <KeyboardAvoidingView enabled={true} behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView>
          <View style={{ padding: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  backgroundColor: 'rgb(253,253,253)',
                  width: 60,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  borderRadius: 10,
                  elevation: 10,
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                }}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                  <Feather name="menu" size={30} />
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgb(253,253,253)',
                    width: 60,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    borderRadius: 10,
                    elevation: 10,
                    shadowOpacity: 0.1,
                    flexDirection: 'row',
                  }}>
                  <Octicons name="bell" size={25} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontFamily: 'Poppins-ExtraLight', fontSize: 40 }}>
                Explore The{' '}
              </Text>
              <Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: 30 }}>
                Beauty Of World!
              </Text>
            </View>
            <View style={{ marginTop: 30, flexDirection: 'row' }}>
              <TextInput
                ref={input}
                style={{
                  backgroundColor: 'rgb(253,253,253)',
                  width: 280,
                  height: 50,
                  borderRadius: 10,
                  paddingLeft: 50,
                  elevation: 10,
                  shadowOpacity: 0.1,
                }}
                placeholder="Search Places"
              />
              <View style={{ zIndex: 10, left: -270, marginTop: 13 }}>
                <TouchableOpacity onPress={Uppdate}>
                  <Octicons name="search" size={25} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(255, 127, 62)',
                  width: 60,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  borderRadius: 10,
                  elevation: 10,
                  shadowOpacity: 0.1,
                }}>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="sort" size={25} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop:25}}>
              <CetagoryScreen/>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
