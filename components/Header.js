import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HeaderTop() {
  return (
    <View style={styles.container}>
     <Header 
     //leftComponent={{ icon: 'menu', color: '#fff' }}
     centerComponent={{ 
       text: 'Helsinki Events Search', 
       style: { 
         color: '#fff',
         fontWeight: 'bold',
         fontSize: 16,
        } }} 
     //rightComponent={{ icon: 'home', color: '#fff' }}
     />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
       //flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
      },
    })
