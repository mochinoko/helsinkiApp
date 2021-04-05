import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, InputAccessoryView, Image , ScrollView } from 'react-native';

const baseurl = "http://open-api.myhelsinki.fi/v1/events/";

export default function DisplayEvents() {
  
  const [data, setData] = useState([]);
  //Keywords that user has inputted
  const [input, setInput] = useState();
  const [img, setImg] = useState([]);

  
  useEffect(() => {
    getAllEvents();
  }, [])

  // function to fetch all events

  const getAllEvents = () => {   
      fetch(baseurl)
        .then((response) => response.json())
        .then((data) => setData(data.data))
        
        .catch((error) => console.error(error))
        //console.log(data.name);
  }



  // function to filter events

  const filterEvents = () => {
    
  }

   // function to fecth based on a tag name

   const fetchTag = () => {

   }

  return (
    <ScrollView>
    <View style={styles.container}>
       <Text>Events: </Text>
  
       <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => {
          return (
            
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
           )
       }

     }
     
     />

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    color:'grey',
    backgroundColor: 'white',
    //alignItems: 'center',
    height: 150,
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
  imgContainer:{
    width:100,
    height:50,
  }
});

/*   <FlatList
       data={data}
       keyExtractor={({ id }, index) => id}
       renderItem={({ item }) => (
         <Text>{'id:'+ item.id + ', Name: ' + item.name.fi}</Text>
       )}
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
<Image styles={styles.imgContainer} source={item.description.images[0].url} />
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
     */