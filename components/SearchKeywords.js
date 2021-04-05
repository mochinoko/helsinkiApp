import React, {useState} from 'react';
import { Alert, StyleSheet, View, Button, TextInput, InputAccessoryView} from 'react-native';

export default function SearchKeywords() {
    
    
    
    return (
        <View style={styles.container}>
            <Button title="Helsinki" style={styles.buttonContainer} />
            <Button title="Espoo" style={styles.buttonContainer} />
            <Button title="Vantaa" style={styles.buttonContainer} />
            <Button title="Music" style={styles.buttonContainer} />
            <Button title="Families" style={styles.buttonContainer} />
            <Button title="Kids" style={styles.buttonContainer} />
        </View>
    );
}        
    const styles = StyleSheet.create({
        container: {
           flex: 2,
           justifyContent: 'space-around',
           flexDirection: 'row', 
           borderColor: 'grey',
     
          },
          buttonContainer: {
            marginRight: 20,
            backgroundColor: 'black',           
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 5,
           },
      
      });