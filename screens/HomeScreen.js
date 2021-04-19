import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import LandingPage from '../components/LandingPage';
import Header from '../components/Header';

const HomeScreen = ({navigation}) => {
    return (  
        <LandingPage />
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  headerContainer: {
    backgroundColor: '#fff',
   //alignItems: 'center',
    width: '100%',
  },

});