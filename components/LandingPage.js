
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import Map from './Map';
import SearchLocation from './SearchLocation';
import DisplayEvents from './DisplayEvents';


export default function LandingPage() {

  return (
    <View style={styles.container}>
      <View style={styles.container}>
       <Map/>
      </View>
        <Text style={styles.txtContainer}>Search Events in Helsinki!</Text>
       
        <View style={styles.container}>
          <DisplayEvents />
        </View>
        <View style={styles.container}>
     
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 300,
    justifyContent: 'center',
    margin: 5
  },
  txtContainer: {
    //flex: 1,
    fontSize: 24, 
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  
});

// <Map />  
/*      <MapView
          style={{ flex: 1, width: '100%'}}
          initialRegion={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
      }} />
      */