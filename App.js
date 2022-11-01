import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, Button, TextInput  } from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
// import { Button, TextInput } from 'react-native-paper';





const AppStack = createNativeStackNavigator();

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [isLoggedIn,setIsLoggedIn] = React.useState(false);
  const [homeTodayScore, setHomeTodayScore] = React.useState(0);
  const [phoneNumber, setPhoneNumber]= React.useState("");

   if (isFirstLaunch == true){
return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
);
  } else if(loggedInState == loggedInStates.LOGGED_IN){
    return <Navigation/>
  }
 else if(loggedInState == loggedInStates.NOT_LOGGED_IN){
    return(
      <View>
        <TextInput style={styles.input}
        placeholderTextColor="#4251F5"
        placeholder= 'Phone Number'
        value= {phoneNumber}
        onChangeText= {setPhoneNumber}></TextInput>
        
        
        <Button 
        title = 'Send'
        style = {styles.button}
        onPress = {async()=>{
          console.log('Button was pressed')
        
          await fetch('https://dev.stedi.me/twofactorlogin/+phoneNumber',
        {
          method: 'POST',
          headers:{
            'content-type':'application/text'
         
          }
          
        }
          )
          setLoggedInState(loggedInStates.CODE_SENT)
          }}
        />
      </View>
    )}
    else if (loggedInState == loggedInStates.CODE_SENT){
      return(
      <View>
        <TextInput 
          placeholder='One Time Password'
          style={styles.input}
          placeholderTextColor='#4251f5'
          value={oneTimePassword}
          onChangeText={setOneTimePassword}
          keyboardType = "numeric"
        >
        </TextInput>
        <Button
        title='Login'
          style={styles.button}
          onPress={async()=>{
            console.log('Login Button was pressed!')
            const loginResponse=await fetch ('https://dev.stedi.me/twofactorlogin',
            {
              method:'POST',
              headers:{
                'content-type':'application/text'
              },
              body: phoneNumber, oneTimePassword
            })
            setLoggedInState(loggedInStates.CODE_SENT)
          }}
        />
      </View>
    )
  }}
        
    

     
  export default App;
 const styles = StyleSheet.create({
 container:{
  flex:1, 
  alignItems:'center',
  justifyContent: 'center'
},
input: {
  marginTop:100,
height: 40,
margin: 12,
borderWidth: 1
}
 })