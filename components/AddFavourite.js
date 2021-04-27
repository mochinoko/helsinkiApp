import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, InputAccessoryView, Image , ScrollView, Alert, Linking } from 'react-native';
import _ from 'lodash';
import { Icon, Button, Overlay  } from 'react-native-elements'
import moment from 'moment';

export default function AddFavourite (item){

const renderItem = ({item}) => {
    return (
        <View style={styles.RowStyle}>
            <Text style={styles.txtContainer}>{''}</Text>
        </View>
    );  
}
const renderEmptyContainer = () => {
    return(
    <View style={styles.EmptyList}>
    <Text>No favourites at the moment</Text>
    </View>
    );
}

  return(
    <View>
     <FlatList 
     //data={item}
     keyExtractor={({ id }, index) => id}
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
