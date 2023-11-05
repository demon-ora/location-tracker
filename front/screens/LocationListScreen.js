import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LocationListScreen = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchUserLocations = useCallback(async () => {
    try {
      console.log('Fetching user locations...');
      const response = await axios.get('http://192.168.1.77:3000/locations');
      setLocations(response.data);
    } catch (err) {
      setError('Error fetching locations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserLocations();

    // Set up an interval to refresh the location list every 10 seconds
    const locationListInterval = setInterval(() => {
      fetchUserLocations();
    }, 10000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(locationListInterval);
    };
  }, [fetchUserLocations]);

  const handleLocationPress = (selectedLocation) => {
    // Navigate to the MapScreen and pass the selected location as a parameter
    navigation.navigate('MapScreen', { selectedLocation });
  };

  const renderLocationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleLocationPress(item)}
    >
      <Text style={styles.locationText}>
        Latitude: {item.latitude}, Longitude: {item.longitude}
      </Text>
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Locations</Text>
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
  locationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  locationText: {
    fontSize: 16,
  },
});

export default LocationListScreen;
