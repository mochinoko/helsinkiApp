import React, {useState} from 'react';
import { Alert, StyleSheet, View, Button, TextInput, InputAccessoryView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function Map() {
    
    const [location, setLocation] = useState(''); 
    const [region, setRegion] = useState({
        latitude: 60.170275, 
        longitude: 24.943749, 
        latitudeDelta: 0.1, 
        longitudeDelta: 0.1
    });


    const ShowAddress= () => { 
        console.log("...showing");
        fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=nuommZxm9EC8dMZmWKJWujcrpDWMRsf1&location=`+location) 
        .then(response => response.json())
        .then(jsonData=> {
            const lat = jsonData.results[0].locations[0].latLng.lat;
            const lng = jsonData.results[0].locations[0].latLng.lng;
            setRegion({   
                latitude: lat, 
                longitude: lng, 
                latitudeDelta: 0.02, 
                longitudeDelta: 0.02
                });
             }) 
        .catch((error) => {
            Alert.alert('Error', error);
        });
    } 
    
    return (
        <View style={styles.container}>
  
        <MapView
            style={
            styles.map_container
            }
            region={ region }
            mapType='standard'
            provider='google'
            tintColor='blue'
             > 
            <Marker
                coordinate={{
                latitude:  region.latitude,
                longitude: region.longitude
                }}
                title={location} 
            />
        </MapView>
        
        <InputAccessoryView >
         <View style={styles.map_container}>
            <TextInput 
                style = {styles.txtInputContainer}
                value={location}
                placeholder = "Address, City"
                onChangeText = {(location) => setLocation(location)}
            />
            <Button title="Search" onPress={ShowAddress} style={styles.buttonContainer} />
            
        </View>
        </InputAccessoryView>
        </View>
   
    );
}        
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            width: 500,
            justifyContent: 'center',
            padding: 20,
            alignItems: 'center',
          },
        map_container: {
          flex: 2,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          width: "150%",
          height: "50%",
        },
        txtInputContainer:{
            flex: 1, 
            borderTopWidth: 1,
            width: '80%', 
            fontSize: 20, 
            backgroundColor: '#CED0CE',
            marginTop: 10,
            color:"#841584",
        },
        buttonContainer:{
          flexDirection: 'row',
          alignItems: 'center',
          //justifyContent: 'space-around',
          borderTopWidth: 1,
          fontSize: 24, 
         
        },
      });