import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './components/LandingPage';
import AppNavigation from "./screens/AppNavigation";
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
      <AppNavigation />
  );
}


// <LandingPage/>