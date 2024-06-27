import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios, { Axios } from 'axios'

const CetagoryScreen = () => {

  

  const PlanAdvice = async ()=>{

const options = {
  method: 'POST',
  url: 'https://travel-advisor.p.rapidapi.com/answers/v2/list',
  params: {
    currency: 'USD',
    units: 'km',
    lang: 'en_US'
  },
  headers: {
    'x-rapidapi-key': '0af187d650msh10eed23ee46e401p16a1f1jsndba3b34e5173',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    contentType: 'hotel',
    contentId: '4172546',
    questionId: '8393250',
    pagee: 0,
    updateToken: ''
  }
};
try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
  }
  return (
    <View>
      <Text style={{ fontFamily: 'Poppins-ExtraLight', fontSize: 20 }}>CetagoryScreen</Text>
    </View>
  )
}

export default CetagoryScreen

const styles = StyleSheet.create({})