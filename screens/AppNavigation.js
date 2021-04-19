import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import FavouriteScreen from './FavouriteScreen';
import MapScreen from './MapScreen';
import DetailScreen from './DetailScreen'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/Header';

import { NavigationContainer } from '@react-navigation/native';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return ( 

    <NavigationContainer>
      <Header />
    <Tab.Navigator>
      <Tab.Screen name="Home" 
      component={HomeScreen} 
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen name="Favourite" 
      component={FavouriteScreen} 
      options={{
        tabBarLabel: 'Favourite',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="heart" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen name="Map" 
      component={MapScreen} 
      options={{
        tabBarLabel: 'Map',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="map" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen name="Settings" 
      component={SettingsScreen} 
      options={{
        tabBarLabel: 'setting',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="cogs" color={color} size={26} />
        ),
      }}
      />
    </Tab.Navigator>
  </NavigationContainer>
  );
}