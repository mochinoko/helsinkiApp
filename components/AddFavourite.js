import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, InputAccessoryView, Image , ScrollView, Alert, Linking } from 'react-native';
import _ from 'lodash';
import { Icon, Button, Overlay  } from 'react-native-elements'
import moment from 'moment';

export default function AddFavourite (item){

const renderItem = ({item}) => {

    return (
    <View>
        <Text> {item.name}, {item.location} </Text>
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
    <Text>My Favourites: </Text>
 
     <FlatList 
        keyExtractor={({ item } ) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyContainer}
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
/*   <View>

    <View
    style={{alignItems: 'center', margin: 3}}
    >
     <Icon 
       title="Add to favourite"
       name='hearto'
       type='antdesign'
       color='#06A8F7'
       onPress={() => heartPressed(id)}
     />
     <Text style={styles.txtContainer}>Add to favourites</Text>
     </View>

    </View>
    */
