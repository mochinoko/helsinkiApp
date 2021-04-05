import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

//const baseurl = "http://open-api.myhelsinki.fi/v1";

export default function DisplayEvents() {
  
  const [data, setData] = useState([]);
  //const [event, setEvent] = useState();
  
  useEffect(() => {
    getAllEvents();
  }, [])

  // function to fetch all events

  const getAllEvents = () => {   
      fetch('http://open-api.myhelsinki.fi/v1/events/')
        .then((response) => response.json())
        .then((data) => setData(data.data))
        .catch((error) => console.error(error))
        console.log(data.name);
  }



  return (
    <View style={styles.container}>
       <Text>Events: </Text>
  
       <FlatList
       data={data}
       keyExtractor={({ id }, index) => id}
       renderItem={({ item }) => (
         <Text>{
           'Name: ' + item.name.fi + '\n'+
           'Description: '+ item.description.intro + '\n'+
           'Date: ' + item.event_dates.starting_day + '\n'+
           'Location: ' + item.location.address.street_address + ', ' +
           item.location.address.locality+
           '\n'
          }
           
           </Text>
       )}
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    color:'grey',
    backgroundColor: 'white',
    //alignItems: 'center',
    height: 100,
    //justifyContent: 'center',
    margin: 5,
 
  },
  txtContainer: {
    flex: 2,
    fontSize: 24, 
    //alignItems: 'center',
   // justifyContent: 'center',
    margin: 5
    
  },
  buttoncontainer:{
    flexDirection: 'row',
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
  },
});

/*   <FlatList
       data={data}
       keyExtractor={({ id }, index) => id}
       renderItem={({ item }) => (
         <Text>{'id:'+ item.id + ', Name: ' + item.name.fi}</Text>
       )}
     />
     */