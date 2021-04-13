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
    const [markers, SetMarkers] = React.useState([]);

/*
    const ShowAddress= () => { 
       
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
*/

    const fetchLocation = () => {
        fetch(`http://open-api.myhelsinki.fi/v1/events/?limit=100`)
        .then(response =>response.json())
        .then(jsonData=>{
            const lat= jsonData.data.location.lat;
            const lng=jsonData.data.location.lng;
            setRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.02, 
                longitudeDelta: 0.02
            });
            SetMarkers(jsondata.data);
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
             {markers.map((marker, index)=> (
                <Marker
                key={index}
                coordinate={{
                latitude:  region.latitude,
                longitude: region.longitude
                }}
                title={location} 
                />
             ))}
            
        </MapView>
        <View style={styles.buttonContainer}>
            <Button title="Helsinki" style={styles.buttonContainer}  onPress = {fetchLocation }/>
            <Button title="Espoo" style={styles.buttonContainer}  />
            <Button title="Vantaa" style={styles.buttonContainer}  />
        </View>
       
        </View>
        
   
    );
}        
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            width: 700,
            justifyContent: 'center',
            padding: 5,
            alignItems: 'center',
          },
        map_container: {
         // flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          width: "150%",
          height: "100%",
        },
        txtInputContainer:{
            //flex: 1, 
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
          justifyContent: 'space-around',
         // borderTopWidth: 1,
          fontSize: 24, 
        margin: 5,
        },
      });