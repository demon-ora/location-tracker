import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Instance from '../utils/axios';

const LocationListScreen = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();


  useEffect(() => {
    fetchUserLocations();    
  }, [])

  const fetchUserLocations = () => {
    Instance.get('/locations')
    .then((response) => {
      setLocations(response.data);
      setLoading(false);
      setLoading(false);
      setError(false);
    })
    .catch((error) => {
      setLoading(false);
      setError('Error fetching locations. Please try again.');
    })
  }

  const handleLocationPress = (selectedLocation) => {
    navigation.navigate('MapScreen', { selectedLocation });
  };

  const renderLocationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleLocationPress(item)}
    >
      <View
      style={styles.locationItemInner}
      >
        <Image
            style={{ width: 30 , height: 30 , marginRight : 10 }}
            source={require('../assets/busfront.png')}
          ></Image>
        <Text style={styles.locationText}>
          Bus Route
        </Text>
        <Image
            style={{ width: 30 , height: 30 , marginRight : 10 , marginLeft : 'auto' }}
            source={require('../assets/right-turn-sign-icon.webp')}
          ></Image>
      </View>
      
      <View
        style={{
          alignItems : 'center',
          justifyContent : 'center',
          borderTopWidth : 1,
          borderTopColor : '#ccc',
          padding : 5
      }}
      >
      <Text>
         Latitude: {item.latitude}, Longitude: {item.longitude}
       </Text>
      </View>
      
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchUserLocations} />
      </View>
    );
  }
 

  return (
    <View style={styles.container}>
      <FlatList
      
        data={locations}
        keyExtractor={(item) => item._id}
        renderItem={renderLocationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  locationItem:{
    marginBottom : 10,
    padding : 15,
    borderRadius : 20,
    marginLeft : 10,
    marginRight : 10,
    shadowColor : '#000',
    shadowOffset : { width : 1 , height : 2 },
    shadowOpacity : 0.26,
    backgroundColor : '#fff',
  },
  locationItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,

  },
  locationText: {
    fontSize: 18,
  },
});

export default LocationListScreen;
