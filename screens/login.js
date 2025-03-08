
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../components/AuthProvider';


export const navy = '#2a4066'

export default function Login({navigation}) {


  // use state for the inputed user info
  const [user, setUser] = useState({username:'',password:''})
  let {setAccountData} = useAuth()

 // useCallback to prevent unnecessary re-renders
 const handleInput = useCallback((field, value) => {
  setUser((prev) => ({
    ...prev,
    [field]: value,
  }));
  
}, []);


  //FIXME MAKE LOGIN MORE ROBUST
  const handleLogin = ()=>{
    if(user.username == 1){
      setAccountData({username:"Eliaslopes@aggies.ncat.edu",password:'ealopes1013',fname:'Elias',lname:"Lopes", medications:[], history:[]})
      navigation.navigate('Home')
    }
  }

//testing input 
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
      <Text style={{color:'white',fontSize:40,fontWeight:'bold'}}>Welcome!</Text>
      <Text style={{color:'white',fontSize:18,}}>Never Miss a Dose</Text>
    </View>

    {/** conatiner wiyth text input boxes */}
    <View style={{
      backgroundColor:'#e6e4e1',
      width:'100%',
      flex:.85,
      borderRadius:30,
      top:50,
      padding:15,
      paddingTop:50
    }}>

        <View style={{gap:20}}>

          
          <View style={{borderWidth:1,backgroundColor:'white',padding:18, borderRadius:35, flexDirection:'row' ,gap:10, alignItems:'center'}}>
            <MaterialIcons name='person' style={{color:'#2a4066',fontSize:'25'}}/>
            <TextInput onChangeText={(text)=>handleInput('username',text)} value={user.username} name='username' placeholder='Enter Username' style={{fontSize:15}}/>     
          </View>

          <View style={{borderWidth:1,backgroundColor:'white',padding:18, borderRadius:35, flexDirection:'row' ,gap:10, alignItems:'center'}}>
            <MaterialIcons name='lock' style={{color:'#2a4066',fontSize:'25'}}/>
            <TextInput onChangeText={(text)=>handleInput('password',text)} value={user.password} name='password' placeholder='Enter Password' style={{fontSize:15}}/>
          </View>

        </View>

        <View style={{borderWidth:0, padding:0, top:40}}>
          <TouchableOpacity onPress={()=> handleLogin()} style={{alignItems:'center', width:'100%',padding:22, borderRadius:30,backgroundColor:navy}}>
            <Text style={{color:'white',fontSize:15, fontWeight:'bold', backgroundColor:navy, alignItems:'center'}}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{borderWidth:0, padding:0, top:60}}>
          <TouchableOpacity onPress={()=> navigation.navigate('Register')} style={{borderWidth:1,alignItems:'center', width:'100%',padding:22, borderRadius:30,backgroundColor:'white'}}>
            <Text style={{color:navy,fontSize:15, fontWeight:'bold', backgroundColor:'white', alignItems:'center'}}>Register</Text>
          </TouchableOpacity>
        </View>


    </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})