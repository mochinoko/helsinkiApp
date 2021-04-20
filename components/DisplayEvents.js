import React, {useState, useEffect}  from 'react';
import { SafeAreaView, Pressable, Alert, Modal, StyleSheet, Text, View, Button, TextInput, FlatList, InputAccessoryView, Image , ScrollView } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements'
import DetailsEvent from './DetailsEvent';

const baseurl = "http://open-api.myhelsinki.fi/v1/events/?limit=100";

export default function DisplayEvents() {
  
  const [data, setData] = useState([]);
  //any input provided by the user to search through the list of data.
  const [query, setQuery] = useState('');
  //hold the data from the API that is going to be used to filter the data.
  const [fullData, setFullData] = useState([]); 
  //set modal visible or not visible
  const [modalVisible, setModalVisible] = useState(false);

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


  /*
  Name Search function: extracts the entered value 
  in the text field and campare it with the data from the data
  */

  const handleSearch = (query) => {
    const newData = data.filter(function(item) {
      const name = item.name.fi ?  item.name.fi.toString().toUpperCase() : '';
      const itemData = `${name}`;
      const textData = query.toString().toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFullData(newData);
    setQuery(query);
  
  }


//Read more deitals function
 
const handleDetails = () => {
  setModalVisible(true);
  console.log('Modal loading');
  return (
   <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", height:300, width:400 }}>
    <Modal 
      visible={modalVisible} 
      animationType='slide'
       transparent={true}

    >
    <View>
    <Button 
      title="Close" 
      style={styles.buttoncontainer} 
      onPress={()=> setModalVisible(false)} 
    />
    <Text>Hello from modal</Text>
    </View>
    </Modal>
   </View>
  );
}

  const renderItem= ({ item }) => {
  
    return (
      <View>  
     
      <Image 
          style={styles.imgContainer} 
          source={{uri: item.description.images[0].url ? 
                  `${item.description.images[0].url}` : 'https://www.freeiconspng.com/uploads/no-image-icon-4.png' 
                  }}
        />
        <View >
          <Text>
          {
            'Name: ' + item.name.fi + '\n'+
            'Description: '+ item.description.intro + '\n'+
            'Date: ' + item.event_dates.starting_day + '\n'+
            'Location: ' + item.location.address.street_address + ', ' +
            item.location.address.locality+  '\n'+
            '\n'
          }
          </Text>
        </View>
   
        <View styles={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text>Add to favourites</Text>
          <Icon 
            title="Add to favourite"
            name='hearto'
            type='antdesign'
            color='#517fa4'
          />
        </View>

        <Button 
          title="Read more" 
          onPress={() => handleDetails()}
          style={styles.buttoncontainer} 
        />
        
       </View>
     )
 }

  return (
　 　
    <View style={styles.container}>
       <Text>All Events: </Text>
       <TextInput
        style={styles.textContainer}
        onChangeText={(query)=> handleSearch(query) }
        value={query}
        placeholder="Search events by name..." 
        />
        <FlatList
        data={fullData}
        keyExtractor={({ id }, index) => id}
        renderItem={renderItem}
        />

    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    color:'grey',
    backgroundColor: 'white',
    //alignItems: 'center',
    height: 700,
    //justifyContent: 'center',
    margin: 5,
  },
  txtContainer: {
    //flex: 1,
    fontSize: 24, 
    //alignItems: 'center',
   // justifyContent: 'center',
    margin: 5,
   // backgroundColor: 'grey'
  },
  buttoncontainer:{
    flexDirection: 'row',
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
  },
  imgContainer:{
    width:100,
    height:100,
    //borderWidth:2,
    borderColor:'#d35647',
    resizeMode:'contain',
    margin:5
  }
});

/*   <FlatList
       data={data}
       keyExtractor={({ id }, index) => id}
       renderItem={({ item }) => (
         <Text>{'id:'+ item.id + ', Name: ' + item.name.fi}</Text>
       )}
     />
      <Image 
          styles={styles.imgContainer} 
          source={'item.description.images[0].url'} 
        />

      <Text>
          {
            'Name: ' + item.name.fi + '\n'+
            'Description: '+ item.description.intro + '\n'+
            'Date: ' + item.event_dates.starting_day + '\n'+
            'Location: ' + item.location.address.street_address + ', ' +
            item.location.address.locality+  '\n'+
            '\n'
           } 
           </Text>
<Image styles={styles.imgContainer} source={uri: item.description.images[0].url} />
           <Image source={item.description.images[0].url} // Use item to set the image source
            key={id} // Important to set a key for list items
            style={{
              width:50,
              height:50,
              borderWidth:2,
              borderColor:'#d35647',
              resizeMode:'contain',
              margin:8
            }}
          />

          <Image 
          style={styles.imgContainer} 
          source={{uri: item.description.images[0].url ? 
                  `${item.description.images[0].url}` : 
                  'https://www.freeiconspng.com/uploads/no-image-icon-4.png' 
                  }}
        />
        <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={renderItem}
        />
     */