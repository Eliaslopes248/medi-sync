import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavBar from './components/bottomNavBar';
import { AuthProvider } from './components/AuthProvider';

const Stack = createStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
          <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
          <Stack.Screen name="Home" component={BottomNavBar} options={{headerShown:false}} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
