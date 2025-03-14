
import { StyleSheet, Text, View,Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  TextInput } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../components/AuthProvider';




const navy = '#2a4066'

export default function Register({navigation}) {

  // get users
  const { users} = useAuth()
  const {addUser} = useAuth()

  // use state for the inputed user info
  const [user, setUser] = useState({username:'',password:'',confirmPassword:'',fname:'',lname:'',medication:[]})

 // useCallback to prevent unnecessary re-renders
 const handleInput = useCallback((field, value) => {
  setUser((prev) => ({
    ...prev,
    [field]: value,
  }));
  
}, []);

const attemptRegister = () => {
  // Check for empty fields
  if (!user.username || !user.password || !user.confirmPassword || !user.fname || !user.lname) {
    Alert.alert("Error", "All fields are required.");
    return;
  }

  // Check if passwords match
  if (user.password !== user.confirmPassword) {
    Alert.alert("Error", "Passwords do not match.");
    return;
  }

  // Check if user already exists
  let found = users.some(userData => userData.username === user.username);
  if (found) {
    Alert.alert("Error", "User already exists.");
    return;
  }

  // Add user
  addUser(user);
  navigation.navigate('Login');
};

//testing input values
//console.log(user)

  return (

    // set background with black BG
    <SafeAreaView style={{
      flex:1,
      backgroundColor:'#2a4066',
      left:0,right:0,top:0,bottom:0,
      justifyContent:'flex-end'
    }}>

    {/** conatiner wiyth text input boxes */}

    <View style={{gap:0,borderWidth:0,color:'white',borderColor:'white',padding:0, top:50, position:'absolute', width:'100%', alignItems:'center'}} >
      <Image source={require('../assets/logo.png')} style={{width:130,height:130, objectFit:'contain'}} />
    </View>


    <View style={{gap:7,borderWidth:0,color:'white',borderColor:'white',padding:15, top:20,}}>
      <Text style={{color:'white',fontSize:40,fontWeight:'bold'}}>Hi!</Text>
      <Text style={{color:'white',fontSize:18,}}>Experience Medicine Like No Other</Text>
    </View>

    {/** conatiner wiyth text input boxes */}
    <View style={{
      backgroundColor:'#e6e4e1',
      width:'100%',
      flex:.85,
      borderRadius:30,
      top:50,
      padding:15,
      paddingTop:30
    }}>

        <View style={{gap:20}}>

          <View style={{flexDirection:'row',gap:20}}>
        
            <View style={{backgroundColor:'white', flexDirection:'row', flex:.48, borderWidth:1,padding:18, borderRadius:30, gap:10}}>
                <MaterialIcons name='person' style={{color:'#2a4066',fontSize:'25'}}/>
                <TextInput onChangeText={(text)=> handleInput('fname',text)} value={user.fname} placeholder='First name' style={{}}/>
            </View>
            <View style={{backgroundColor:'white', flexDirection:'row', flex:.48, borderWidth:1,padding:18, borderRadius:30, gap:10}}>
                <MaterialIcons name='person' style={{color:'#2a4066',fontSize:'25'}}/>
                <TextInput onChangeText={(text)=> handleInput('lname',text)} value={user.lname} placeholder='Last name' style={{}}/>
            </View>

          </View>

          
          <View style={{backgroundColor:'white',padding:18, borderRadius:35,borderWidth:1, flexDirection:'row' ,gap:10, alignItems:'center'}}>
            <MaterialIcons name='person' style={{color:'#2a4066',fontSize:'25'}}/>
            <TextInput onChangeText={(text)=>handleInput('username',text)} value={user.username} name='username' placeholder='Enter Email' style={{fontSize:15}}/>     
          </View>

          <View style={{borderWidth:1,backgroundColor:'white',padding:18, borderRadius:35, flexDirection:'row' ,gap:10, alignItems:'center'}}>
            <MaterialIcons name='lock' style={{color:'#2a4066',fontSize:'25'}}/>
            <TextInput secureTextEntry onChangeText={(text)=>handleInput('password',text)} value={user.password} name='password' placeholder='Enter Password' style={{fontSize:15, width:'100%'}}/>
          </View>
          <View style={{borderWidth:1,backgroundColor:'white',padding:18, borderRadius:35, flexDirection:'row' ,gap:10, alignItems:'center'}}>
            <MaterialIcons name='lock' style={{color:'#2a4066',fontSize:'25'}}/>
            <TextInput secureTextEntry onChangeText={(text)=>handleInput('confirmPassword',text)} value={user.confirmPassword} name='Confirmpassword' placeholder='Confirm Password' style={{fontSize:15, width:'100%'}}/>
          </View>

        </View>

        <View style={{borderWidth:0, padding:0, top:20}}>
          <TouchableOpacity onPress={attemptRegister} style={{alignItems:'center', width:'100%',padding:22, borderRadius:30,backgroundColor:'white', borderWidth:1}}>
            <Text style={{color:navy,fontSize:15, fontWeight:'bold', backgroundColor:'white', alignItems:'center'}}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderWidth:0, padding:0, top:40}}>
          <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={{alignItems:'center', width:'100%',padding:22, borderRadius:30,backgroundColor:navy}}>
            <Text style={{color:'white',fontSize:15, fontWeight:'bold', backgroundColor:navy, alignItems:'center'}}>Sign in instead</Text>
          </TouchableOpacity>
        </View>


    </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})