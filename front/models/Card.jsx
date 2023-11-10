import React, { useEffect, useState } from 'react';
import { View, Text , Button , StyleSheet } from 'react-native';



const Cards = ({id , setCardShow}) => {
  let locationofToilets = [
    {
      id : 1,
      title : 'Toilet 1',
      location : {
        latitude: 27.635115163670722,
        longitude: 85.21667719752,
      },
      description : 'Toilet 1',
      ratings : [
        {
          id : 1,
          rating : 4,
          comment : 'Good'
        },
        {
          id : 2,
          rating : 3,
          comment : 'Average'
        },
        {
          id : 3,
          rating : 5,
          comment : 'Excellent'
        }
      ]
    },
    {
      id : 2,
      title : 'Toilet 2',
      location : {
        latitude: 27.625115163670722,
        longitude: 85.2166771975252,
      },
      description : 'Toilet 2',
    },
    {
      id : 3,
      title : 'Toilet 3',
      location : {
        latitude: 27.634115163670722,
        longitude: 85.22667719752,
      },
    }
  ]
  
const [ cardDetails , setCardDetails ] = useState({})

useEffect(() => {
 locationofToilets.map((item) => {
    if(item.id === id){
      setCardDetails(item)
    }
  })
}, [id])

return (
  <>
   <View style={styles.card}>
      <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <View>
                <Text style={styles.cardHeaderTitle} >Route Name</Text>
                <Text>
                  some description
                </Text>
                <Text>
                  10km Away
                </Text>
            </View>
            <View>
              <Button title="Close" onPress={() => setCardShow(false)} />
            </View>
          </View>
      </View>
    </View>
  </>
);
};

const styles = StyleSheet.create({
cardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},
cardHeaderTitle: {
  fontSize: 20,
  fontWeight: 'bold',
},
cardBody: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
},
close :  {
  width: 40,
  height: 40,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  color: 'black',
  backgroundColor: 'white',
},
card: {
  position: 'absolute',
  zIndex: 999,
  bottom: 0,
  width: '100%',
  padding: 20,
  // Add more styles as needed for your card
},
});

export default Cards;