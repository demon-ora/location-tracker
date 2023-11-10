import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline,animateToRegion,AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = ({ route }) => {
  const { selectedLocation } = route.params;

  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
       console.log("hello");
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        console.log(location.coords);
        const { latitude, longitude } = location.coords;

        setUserLocation({ latitude, longitude });

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    getLocation();

    const locationInterval = setInterval(() => {
      getLocation();
    }, 1000);

    return () => {
      clearInterval(locationInterval);
    };
  }, []);

  const path = [userLocation, selectedLocation];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            description={`Latitude: ${userLocation.latitude}, Longitude: ${userLocation.longitude}`}
          />
        )}

        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          title="Selected Location"
          description={`Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}`}
        />

        <Polyline
          coordinates={path}
          strokeColor="#3498db"
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
