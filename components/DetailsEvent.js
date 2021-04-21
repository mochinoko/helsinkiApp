import React, {useState, useEffect}  from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import { Icon, Button, Overlay  } from 'react-native-elements'

const [visible, setVisible] = useState(false);
const [data, setData] = useState([]);


  
export default function DetailsEvent() {
    useEffect(() => {
        getAllEvents();
    
      }, [])
    
      // function to fetch all events
    
      const getAllEvents = () => {   
          fetch(baseurl)
            .then((response) => response.json())
            .then((data) => { 
              setData(data.data)
              setFullData(data.data)
            })
            .catch((error) => console.error(error))
            console.log('loading....');
      }
    //Read more deitals overlay function
    const toggleOverlay = (id) => {
        setVisible(!visible);
        setEventId(id);
      }; 
    return (
      <View style={styles.container}>
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
      {item.name.fi + '\n'}
      </Text>
      <Image 
      style={{
        width:200,
        height:200,
        resizeMode:'contain',
        margin:5
      }}
      
      source=
      {{
        uri: item.description.images[0].url ? 
        `${item.description.images[0].url}` : 
        'https://www.freeiconspng.com/uploads/no-image-icon-4.png' 
      }}
      />
      <Text>
      {
        'Description: '+ text+ '\n'+
        'Start Date: ' + timeOfStart + '\n'+
        'End Date: ' + timeOfEnd + '\n'+
        'Location: ' + address + ', ' +
        city +  '\n'+
        '\n'
      }
      </Text>
    </Overlay>
        
      </View>
    );
};



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});