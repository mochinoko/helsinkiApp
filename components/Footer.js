import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { Footer } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer() {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
       // flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
          },
    })
