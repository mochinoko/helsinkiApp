import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FavouriteScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Favourite Screen</Text>
        <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("Details")}
        />
        <Button
            title="Go to home"
            onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
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