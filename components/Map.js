import React, {useState, useEffect} from 'react';
import { Alert, StyleSheet, View, Button, TextInput, InputAccessoryView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function Map() {

    const [lat, SetLat] = React.useState('');
    const [lng, SetLng] = React.useState('');
    const [location, setLocation] = useState(''); 
    const [region, setRegion] = useState({
        latitude: 60.170275, 
        longitude: 24.943749, 
        latitudeDelta: 0.1, 
        longitudeDelta: 0.1
    });
    const [markers, setMarkers] = React.useState([]);


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

        useEffect(() => {
            fetchLocation();

        }, [])


console.log(markers);
    const fetchLocation = () => {
        fetch(`http://open-api.myhelsinki.fi/v1/events/?limit=100`)
        .then(response =>response.json())
        .then(jsonData=>{
            //const lat= jsonData.data[0].location.lat;
            //const lng = jsonData.data[0].location.lon;
           
            setMarkers(jsonData.data);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
        console.log('fetching location..')
    }
    //console.log(markers);

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
                {markers.map((marker, index)　=> (
                    
                    <Marker
                    key={index}
                    coordinate={{
                        latitude:  marker.location.lat,
                        longitude: marker.location.lon
                    }}
                    title={marker.name.fi}
                    description={marker.description.intro} 
                    />
                 ))}
            </MapView>
            <View style={styles.buttonContainer}>
                <Button title="Helsinki" style={styles.buttonOne} onPress={fetchLocation}/>
                <Button title="Espoo" style={styles.buttonTwo}  />
                <Button title="Vantaa" style={styles.buttonThree}  />
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
            padding: 0,
            alignItems: 'center',
          },
        map_container: {
         flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          width: "150%",
          height: "100%",
        },
        buttonContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderWidth: 1,
            borderColor:'#fff',
            fontSize: 24, 
            marginTop: 5,
        },
        buttonOne:{
            padding: 3,
        }
        ,
        buttonTwo:{
            padding: 3,
        },
        buttonThree:{
            padding: 3,
        }
      });