import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth } from '../components/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { navy } from './home'
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

export default function Profile({navigation}) {

    // get user account info
    const {accountData, setAccountData} = useAuth()

    const handleAccountChange = (col,data)=>{
        setAccountData((prev)=>({
            ...prev,
            [col]: data
        }))
        console.log(accountData)
    }

    const handleSave = ()=>{
        setAccountData(accountData)
        Alert.alert("Profile Info Saved")
    }


  return (
    <SafeAreaView style={{backgroundColor:navy, flex:1, justifyContent:'flex-end'}}>

        <View style={{borderWidth:0, alignItems:'center', top:50, position:'absolute', width:'100%', top:150, zIndex:2}}>
            <MaterialIcons name='person' style={{color:'white',fontSize:65, backgroundColor:'lightgray', padding:10, borderRadius:'50%'}}/>
        </View>
        <View style={{
            backgroundColor:'white',
            width:"100%",
            borderRadius:30,
             flex:.9,
             top:70,
             justifyContent:'center'
             
        }}>

            <View style={{width:'100%', padding:15, borderWidth:0, gap:20}}>
                <View>
                    <Text style={{fontSize:15}}>
                        Medications: {accountData.medications.length}
                    </Text>
                </View>
                <View style={{gap:5}}>
                    <Text style={{fontSize:15, color:navy, fontWeight:'bold'}}>Username</Text>
                    <TextInput onChangeText={(text)=>handleAccountChange('username',text)} placeholder='Enter Email' value={accountData.username} name='username' style={{
                        width:'100%',
                        padding:15,
                        backgroundColor:'#e8e4e3',
                        borderRadius:30,
                        fontSize:15,
                    }}/>

                </View>
                <View style={{gap:5}}>
                    <Text style={{fontSize:15, color:navy, fontWeight:'bold'}}>First Name</Text>
                    <TextInput onChangeText={(text)=>handleAccountChange('username',text)} placeholder='Enter First Name' value={accountData.fname} name='fname' style={{
                        width:'100%',
                        padding:15,
                        backgroundColor:'#e8e4e3',
                        borderRadius:30,
                        fontSize:15,
                    }}/>

                </View>
                <View style={{gap:5}}>
                    <Text style={{fontSize:15, color:navy, fontWeight:'bold'}}>Last Name</Text>
                    <TextInput onChangeText={(text)=>handleAccountChange('username',text)} placeholder='Enter Last Name' value={accountData.lname} name='lname' style={{
                        width:'100%',
                        padding:15,
                        backgroundColor:'#e8e4e3',
                        borderRadius:30,
                        fontSize:15,
                    }}/>

                </View>
            </View>

            <View style={{borderWidth:0, alignItems:'center', padding:15}}>
                <TouchableOpacity onPress={handleSave} style={{flexDirection:'row',padding:20, backgroundColor:navy, width:'100%', borderRadius:30, justifyContent:'center', gap:10, alignItems:'center'}}>
                    <MaterialIcons name='check' style={{color:'white', fontSize:17}}/>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:15}}>Save Changes</Text>
                </TouchableOpacity>
            </View>
            <View style={{borderWidth:0, alignItems:'center', padding:15}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{flexDirection:'row',padding:20, backgroundColor:'#d63c31', width:'100%', borderRadius:30, justifyContent:'center', gap:10, alignItems:'center'}}>
                    <MaterialIcons name='lock' style={{color:'white', fontSize:17}}/>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:15}}>Log out</Text>
                </TouchableOpacity>
            </View>


        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})