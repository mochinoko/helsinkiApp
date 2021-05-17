import React, {useState}  from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, InputAccessoryView, Image , ScrollView, Alert, Linking } from 'react-native';
import _ from 'lodash';
import { Icon, Button, Overlay  } from 'react-native-elements'
import moment from 'moment';
import DisplayEvents from './DisplayEvents';

export default function AddFavourite(){

const renderItem = ({ props }) => {

    return (
    <View>
       <Text>{props.favouriteList.name.fi}</Text>
    </View>
    );  
}

const renderEmptyContainer = () => {
    return(
    <View style={styles.EmptyList}>
         <Text> No favourites at the moment</Text>
    </View>
    );
}
  
  return(
    <View>
     <FlatList 
        data={props.favouriteList}
        keyExtractor={({ item } ) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyContainer}
        ListHeaderComponent={<Text >Favourite Events</Text>}
     />
    </View>
    );
}
const styles = StyleSheet.create({
    RowStyle: {
        flex:1,
        flexDirection: 'column',
        margin:1
    },
    txtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    EmptyList: {
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',

    },
    listcontainer: {
        flex:3,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }
    
});
/*   


     <View>
    <Text>My Favourites: </Text>

     <FlatList 
        keyExtractor={({ item } ) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyContainer}
       
     />
    </View>
    */
