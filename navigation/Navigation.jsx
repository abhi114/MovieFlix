import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import MovieDetails from '../screens/MovieDetails';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
const Stack = createNativeStackNavigator();
const Navigation = () => {
    
  return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
            <Stack.Screen name="MovieDetails" options={{headerShown:false}} component={MovieDetails}/>
            <Stack.Screen name="PersonScreen" options={{headerShown:false}} component={PersonScreen}/>
            <Stack.Screen name="SearchScreen" options={{headerShown:false}} component={SearchScreen}/>
            
            </Stack.Navigator>
        </NavigationContainer>
  )
}

export default Navigation