import React, {useState, useEffect} from 'react';
import { Alert, StyleSheet, View, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {  Button } from 'react-native-elements'


export default function Map() {

    const [region, setRegion] = useState({
        latitude: 60.170275, 
        longitude: 24.943749, 
        latitudeDelta: 0.1, 
        longitudeDelta: 0.1
    });
    const [markers, setMarkers] = React.useState([]);

        useEffect(() => {
            fetchLocation();

        }, [])


    const fetchLocation = () => {
        fetch(`http://open-api.myhelsinki.fi/v1/events/?limit=1000`)
        .then(response =>response.json())
        .then(jsonData=>{           
            setMarkers(jsonData.data);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
        console.log('fetching location..')
    }
    //console.log(markers);

    // function to point Events in Espoo
    const fetchEspoo = () => {
            setRegion({   
                latitude: 60.2055, 
                longitude: 24.6559, 
                latitudeDelta: 0.1, 
                longitudeDelta: 0.1
            });
    }
    // function to point Events in Helsinki
    const fetchHelsinki = () => {
            setRegion({   
                latitude: 60.170275, 
                longitude: 24.943749, 
                latitudeDelta: 0.1, 
                longitudeDelta: 0.1
            });
        
    }
    // function to point Events in Vantaa
        const fetchVantaa= () => {
                setRegion({   
                    latitude: 60.2934, 
                    longitude: 25.0378, 
                    latitudeDelta: 0.1, 
                    longitudeDelta: 0.1
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
                <Button title="Helsinki" style={styles.buttonOne} onPress={fetchHelsinki}/>
                <Button title="Espoo" style={styles.buttonTwo}  onPress={fetchEspoo}/>
                <Button title="Vantaa" style={styles.buttonThree} onPress={fetchVantaa} />
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