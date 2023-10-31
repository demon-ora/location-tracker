import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const LocationListScreen = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserLocations = useCallback(async () => {
    try {
      const response = await axios.get('http://192.168.1.95:3000/locations');
      setLocations(response.data);
    } catch (err) {
      setError('Error fetching locations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserLocations();
  }, [fetchUserLocations]);

  const renderLocationItem = ({ item }) => (
    <View style={styles.locationItem}>
      <Text style={styles.locationText}>
        Latitude: {item.latitude}, Longitude: {item.longitude}
      </Text>
    </View>
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
    backgroundColor: '#fff', // Set the background color
    paddingHorizontal: 16, // Add horizontal padding
    paddingTop: 20, // Add top padding
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
    paddingVertical: 10, // Increase vertical padding
  },
  locationText: {
    fontSize: 16,
  },
});

export default LocationListScreen;
