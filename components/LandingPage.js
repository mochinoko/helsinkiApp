import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import Map from './Map';
import SearchLocation from './SearchLocation';
import DisplayEvents from './DisplayEvents';
import Header from './Header';


export default function LandingPage() {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
       <Map/>
      </View>
        <View style={styles.displayContainer}>
          <DisplayEvents />
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
    margin: 0
  },
  headerContainer: {
    //flex: 1,
    backgroundColor: '#fff',
   //alignItems: 'center',
    width: '100%',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  
  displayContainer: {
    flex: 1,
  },
  txtContainer:{
   margin: 16
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