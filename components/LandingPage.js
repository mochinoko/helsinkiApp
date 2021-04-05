
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import Map from './Map';
import SearchKeywords from './SearchKeywords';
import DisplayEvents from './DisplayEvents';


export default function LandingPage() {

  return (
    <View style={styles.container}>
        <Map /> 
        <View style={styles.container}>
          <Text style={styles.txtContainer}>Search Events in Helsinki!</Text>
        
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
    height: 500,
    justifyContent: 'center',
    margin: 5
  },
  txtContainer: {
    flex: 2,
    fontSize: 24, 
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
    
  },
  buttoncontainer:{
    flexDirection: 'row',
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
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