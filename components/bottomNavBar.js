import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  // Import bottom tab navigator
import Home from '../screens/home';
import { MaterialIcons } from '@expo/vector-icons';
import { navy } from '../screens/home';
import Profile from '../screens/profile';
import InputMeds from '../screens/inputMed';

const Tab = createBottomTabNavigator()

export default function BottomNavBar() {
  return (
   
        <Tab.Navigator
        initialRouteName='Homepage'
        screenOptions={{
            tabBarStyle:{
                height:90,
                justifyContent:'center',
                paddingTop:10,
            
            },
            tabBarActiveTintColor:'#858282',
            
        }}
        
        >
            <Tab.Screen 
            name='Homepage'
            component={Home}
            options={{headerShown:false, 
                tabBarIcon: () => (
                    <MaterialIcons name="home" color={navy} size={30} />
                  ),tabBarLabel:()=>null}}
            />

            <Tab.Screen 
            name='History'
            component={Home}
            options={{headerShown:false, 
                tabBarIcon: () => (
                    <MaterialIcons name="schedule" color={navy} size={30} />
                  ),tabBarLabel:()=>null}}
            />

            <Tab.Screen 
            name='InputMeds'
            component={InputMeds}
            options={{headerShown:false, 
                tabBarIcon: () => (
                    <MaterialIcons name="add" color={navy} size={30} />
                  ),tabBarLabel:()=>null}}
            />
        
            <Tab.Screen 
            name='Profile'
            component={Profile}
            options={{headerShown:false, 
                tabBarIcon: () => (
                    <MaterialIcons name="person" color={navy} size={30} />
                  ),tabBarLabel:()=>null}}
            />





        </Tab.Navigator>
   
    
  )
}

const styles = StyleSheet.create({})