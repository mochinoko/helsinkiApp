import React, {useState, useEffect}  from 'react';
import { Alert, StyleSheet, View, Button, TextInput, InputAccessoryView} from 'react-native';

export default function SearchLocation() {
    const [location, setLocation] =([]);
    const baseurl = "http://open-api.myhelsinki.fi/v1/events/?limit=100";
    //function to fecth based on a location

  const getLocation = () => {   
      fetch(baseurl)
        .then((response) => response.json())
        .then((data) => { 
          setData(data.data)
          setFullData(data.data)
        })
        .catch((error) => console.error(error))
        console.log('loading');
  }

    
    return (
        <View style={styles.container}>
            <Button title="Helsinki" style={styles.buttonContainer} />
            <Button title="Espoo" style={styles.buttonContainer} />
            <Button title="Vantaa" style={styles.buttonContainer} />
        </View>
    );
}        
    const styles = StyleSheet.create({
        container: {
           //flex: 1,
           justifyContent: 'space-around',
           flexDirection: 'row', 
           borderColor: 'grey',     
          },
          buttonContainer: {
            
            backgroundColor: 'black',           
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 5,
            margin: 5,
           },
      
      });