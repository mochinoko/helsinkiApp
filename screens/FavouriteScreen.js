import React, {useState, useEffect}  from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AddFavourite from '../components/AddFavourite';

//function to save list of likes


const FavouriteScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
      <AddFavourite />
      </View>
    );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});