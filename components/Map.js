import React, {useState, useEffect} from 'react';
import { Alert, StyleSheet, View, Linking} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {  Button, Overlay, Icon, Text, Image } from 'react-native-elements'
import moment from 'moment';


export default function Map() {

  const [visible, setVisible] = useState(false);
    const [region, setRegion] = useState({
        latitude: 60.170275, 
        longitude: 24.943749, 
        latitudeDelta: 0.1, 
        longitudeDelta: 0.1
    });
    const [markers, setMarkers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

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


    const toggleOverlay = (marker) => {
        const singleUrl='http://open-api.myhelsinki.fi/v1';
       
          fetch(singleUrl + `/event/${marker.id}`) 
          .then((response) => response.json())
          .then((data) => { 
            setSelectedEvent(data);
          })
          .then(_ => setVisible(!visible))
          .then(_ => setIsLoading(true))
          .catch((error) => console.error(error))
        
      
        setVisible(!visible);
       //setIsLoading(true);
   
        //console.log('Hello from Map da da! '+ marker.name.fi +marker.id);
    }
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

        let nonText='No details';
        let url;
        if (selectedEvent.info_url === null) url = "https://www.myhelsinki.fi/"
        else url = selectedEvent.info_url
        

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
                    onPress={()=>(toggleOverlay(marker))}
                    />
                    
                 ))}
            </MapView>
            <View style={styles.buttonContainer}>
                <Button title="Helsinki" style={styles.buttonOne} onPress={fetchHelsinki}/>
                <Button title="Espoo" style={styles.buttonTwo}  onPress={fetchEspoo}/>
                <Button title="Vantaa" style={styles.buttonThree} onPress={fetchVantaa} />
            </View>
 {/* Overlay */ }    
        <Overlay 
        animationType='slide' 
        transparent={true}
        isVisible={visible} 
        onBackdropPress={toggleOverlay}
         >
        <Icon 
            name= 'close'           
            onPress={toggleOverlay}
            style={{
            alignItems: 'flex-end', 
            margin: 2,
            }}
        />
        <Text
        style={{
          fontSize:24,
          fontWeight: "bold",
        }}
        >
        {
            isLoading ? selectedEvent.name.fi: 'none' 
        }
        </Text>      
        <Image 
        style={{
          width:200,
          height:200,
          resizeMode:'contain',
          margin:5
        }}
        
        source=
        {isLoading? {
          uri: selectedEvent.description.images[0].url ? 
          `${selectedEvent.description.images[0].url}` : 
          'https://www.freeiconspng.com/uploads/no-image-icon-4.png' 
        }:'https://www.freeiconspng.com/uploads/no-image-icon-4.png' }
        />
        <Text>Start Date: 
        {
          isLoading ? 
          moment(selectedEvent.event_dates.starting_day).format('lll'):nonText
         }
         </Text>
        <Text>End Date: 
        {
          isLoading ?
           moment(selectedEvent.event_dates.ending_day).format('LLL')=== 'Invalid date' ? ' Please check the event\'s URL' : selectedEvent.event_dates.ending_day :nonText}</Text>
        <Text>
         Location:
          {
          isLoading ?
            selectedEvent.location.address.street_address: nonText
          }, {' '}
          {
            isLoading ?
              selectedEvent.location.address.locality: nonText
          }{' '}
          {
            isLoading ?
              selectedEvent.location.address.postal_code: nonText
          }

         </Text>

        <Text>
        {
        isLoading ? selectedEvent.description.intro: `${nonText}`

        }
        </Text>


        <Text 
          style={{
          color:'blue'
        }}
          onPress={() => Linking.openURL(url)}
          >
          Event's URL
        </Text>

      </Overlay>
     
 {/*End of Overlay */ }    
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