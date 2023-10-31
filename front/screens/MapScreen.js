import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const locations = route.params.locations;

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}>
        {locations.map((location) => (
          <Marker
            key={location._id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="User Location"
            description={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
