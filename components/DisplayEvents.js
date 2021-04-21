import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, InputAccessoryView, Image , ScrollView, Alert } from 'react-native';
import _ from 'lodash';
import { Icon, Button, Overlay  } from 'react-native-elements'
import moment from 'moment';

const baseurl = "http://open-api.myhelsinki.fi/v1/events/?limit=1000";

export default function DisplayEvents() {
  
  const [data, setData] = useState([]);
  //any input provided by the user to search through the list of data.
  const [query, setQuery] = useState('');
  //hold the data from the API that is going to be used to filter the data.
  const [fullData, setFullData] = useState([]); 

  const [visible, setVisible] = useState(false);

  const [eventId, setEventId] =useState(0);


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
          setEventId(data.data.id)
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


//Read more deitals overlay function
const toggleOverlay = (id) => {
  setVisible(!visible);
  setEventId(id);
  console.log("toggled overlay");
}; 

  const renderItem= ({ item, index }) => {
    let id =item.id;
    let text=item.description.intro;
    let nameOfEvent = item.name.fi;
    let address = item.location.address.street_address;
    let city= item.location.address.locality;
    let timeOfStart = moment(item.event_dates.starting_day).format('lll');
    let timeOfEnd = moment(item.event_dates.ending_day).format('lll');

    return (
      <View>  
      <Image 
          style={styles.imgContainer} 
          source={{uri: item.description.images[0].url ? 
                  `${item.description.images[0].url}` : 
                  'https://www.freeiconspng.com/uploads/no-image-icon-4.png' 
                  }}
        />
        <View >
          <Text>
          {
            'Name: ' + nameOfEvent+ '\n'+
            'Start Date: ' + timeOfStart+ '\n'+
            'End Date: ' + timeOfEnd + '\n'+
            'Location: ' + address + ', ' +
            city+  '\n'+
            '\n'+id
          }
          </Text>
        </View>
         <View
         style={{alignItems: 'center'}}
         >
          <Icon 
            title="Add to favourite"
            name='hearto'
            type='antdesign'
            color='#06A8F7'
          />
          <Text style={styles.txtContainer}>Add to favourites</Text>
          </View>
        <Button 
          title="Read more" 
          onPress={toggleOverlay}
          style={styles.buttoncontainer} 
        />
        <View>   
    {/* Overlay */ }    
        <Overlay 
          animationType='slide' 
          transparent={true}
          isVisible={visible} 
          onBackdropPress={toggleOverlay}
          key={index}
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
            '\n'+id
          }
          </Text>
        </Overlay>
  {/* End of Overlay */ }    
      </View>
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
    alignItems: 'center',
    height: 700,
    //width: '100%',
    //justifyContent: 'center',
    margin: 5,
  },
  txtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttoncontainer:{
    flexDirection: 'row',
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor:'grey',
    padding: 8, 
    
  },
  imgContainer:{
    width:100,
    height:100,
    borderColor:'#d35647',
    resizeMode:'contain',
    margin:5
  }, 
  overlayView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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