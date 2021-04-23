import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, InputAccessoryView, Image , ScrollView, Alert, Linking } from 'react-native';
import _ from 'lodash';
import { Icon, Button, Overlay  } from 'react-native-elements'
import moment from 'moment';
import { WebView } from 'react-native-webview';

const baseurl = "http://open-api.myhelsinki.fi/v1/events/?limit=1000";

export default function DisplayEvents() {
  
  const [data, setData] = useState([]);
  //any input provided by the user to search through the list of data.
  const [query, setQuery] = useState('');
  //hold the data from the API that is going to be used to filter the data.
  const [fullData, setFullData] = useState([]); 

  const [singleData, setSingleData]  = useState([]); 
  const [visible, setVisible] = useState(false);

  const [eventId, setEventId] =useState(0);

  const [single, setSingle] =useState('');

  //empty object to store single selected event data
  const [selectedEvent, setSelectedEvent] = useState([]);

  const [singleImage, setSingleImage] = useState('');

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
/*create state for the 'selected event'
  and do the fetch when user press read more button to get detailed info
  if you don't already have that. Save these info to selected event state. 
  Then in the overlay you will show values from selected event state.*/

const toggleOverlay = (id, singleName, image, singleData) => {
  setVisible(!visible);
 /*
  const singleUrl='http://open-api.myhelsinki.fi/v1';
  fetch(singleUrl + `/event/${id}`)
  
  .then((response) => response.json())
  .then((data) => { 
    setSelectedEvent(data);
  })
  .catch((error) => console.error(error))
  */
  setSelectedEvent(singleData);
  setSingle(singleName);
  setSingleImage(image);
  
  console.log("toggled overlay..." + id + ' '+ singleName + singleData);
}; 

const renderItem= ({ item }) => {
    let id =item.id;
    let text=item.description.intro;
    let nameOfEvent = item.name.fi;
    let address = item.location.address.street_address;
    let city= item.location.address.locality;
    let timeOfStart = moment(item.event_dates.starting_day).format('lll');
    let timeOfEnd = moment(item.event_dates.ending_day).format('lll');
    let image=item.description.images[0];
    let singleName =item.name.fi;
    let singleData=[];
    singleData=item;
    
    let url;
    if (item.info_url === null) url = "https://www.myhelsinki.fi/"
    else url = item.info_url

    return (
      <View>  
      <Image 
          style={styles.imgContainer} 
          source={{uri: image.url ? 
                  `${image.url}` : 
                  'https://www.freeiconspng.com/uploads/no-image-icon-4.png' 
                  }}
        />
        <View style={styles.textContainer}>
          <Text>Name: {nameOfEvent} </Text>
          <Text>Start Date: {timeOfStart}</Text>
          <Text>End Date: {timeOfEnd === 'Invalid date' ? ' Please check the event\'s URL' : timeOfEnd}</Text>
          <Text>Location: {address}, {city} </Text>
          <Text>ID: {id} </Text>

        </View>
         <View
         style={{alignItems: 'center', margin: 3}}
         >
          <Icon 
            title="Add to favourite"
            name='hearto'
            type='antdesign'
            color='#06A8F7'
          />
          <Text style={styles.txtContainer}>Add to favourites</Text>
          </View>

  {/* If user press, the selected event´s id will be saved  */ }  
        <Button 
          title="Read more" 
          onPress={()=>(toggleOverlay(id, singleName, image, singleData, selectedEvent))}
          style={styles.buttoncontainer} 
        />
        <View
        >   
    {/* Overlay */ }    
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
          {single}
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
            uri: {singleImage}.url ? 
            `${{singleImage}.url}` : 
            'https://www.freeiconspng.com/uploads/no-image-icon-4.png' 
          }}
          />
          <Text>

          </Text>
          <Text 
          style={{
            color:'blue'}}
          onPress={() => Linking.openURL(url)}
            >Event's URL</Text>
        
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
    elevation: 5,
    resizeMode:'contain',
    

  }
});

/*  

 */