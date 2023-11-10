import React, { useEffect, useState, useRef } from 'react';
import { View , Text, Image } from 'react-native';
import MapView, { Marker, Polyline,animateToRegion,AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';
import Compass from '../models/Compass';
import Cards from '../models/Card';

const MapScreen = ({ route }) => {
  const { selectedLocation } = route.params;
  const [ permission , setPermission ] = useState(false);
  const [myLocation, setMyLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardShow , setCardShow] = useState(true);
  const [path, setPath] = useState([
    { latitude: 37.8025259, longitude: -122.4351431 },
    { latitude: 37.7896386, longitude: -122.421646 },
  ]);
  const mapRef = useRef(null);



  useEffect(() => {
    getCurrentLocation();
    console.log(route.params.selectedLocation._id);
  }, [route]);

  useEffect( () => {
    Location.getBackgroundPermissionsAsync().then((status) => { } );
    Location.hasServicesEnabledAsync().then((status) => {} );
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
          setMyLocation(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
          )
          setPath([{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }
        
        ])
      }
      
    )
  } , [] )

  useEffect(() => {
    getLocationPermission();
  } , []);
 async function getLocationPermission() {
   const { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== 'granted') {
     console.log('Location permission denied');
     return;
   }
   if(status === 'granted'){
     console.log('Location permission granted');
     getCurrentLocation();
     setPermission(true);
   }
 }

  
  async function getCurrentLocation() {
    const { coords } = await Location.getCurrentPositionAsync({ accuracy: 1 });
    const { latitude, longitude } = coords;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    setMyLocation
    ({
      latitude: latitude,
      longitude: longitude,
    })
    setPath([{
      latitude: latitude,
      longitude: longitude,
    },
    {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    }
  
  ])
    setLoading(false);
  }

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
        {myLocation && (
          <Marker
            coordinate={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
            }}
            title="Your Location"
            description={`Latitude: ${myLocation.latitude}, Longitude: ${myLocation.longitude}`}
          >
            <Compass />
            </Marker>
        )}

        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          title="Selected Location"
          description={`Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}`}
        >
          <Image
          style={{ 
            height: 30,
            width: 30,
          }}
          source={require('../assets/bus.png')
        }
        />
          </Marker>

            <Polyline
            coordinates={path}
            strokeColor="#3498db"
            strokeWidth={2}
          />
      </MapView>
      {
        cardShow ? <Cards id={1} setCardShow={setCardShow} /> : null
      }
    </View>
  );
};

export default MapScreen;
