import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { AuthRoutes } from '../Routes';
import LoginScreen from '@/app/screens/LoginScreen';
import SignupScreen from '@/app/screens/SignupScreen';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
       <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} options={{}}/>
       <Stack.Screen name={AuthRoutes.SignUp} component={SignupScreen} options={{}}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator

const styles = StyleSheet.create({})