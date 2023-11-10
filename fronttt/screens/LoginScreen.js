import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = { email, password };

    try {
      const response = await fetch('http://192.168.1.77:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Save the JWT token to AsyncStorage
        await AsyncStorage.setItem('jwtToken', data.token);

        // Redirect to the 'Tracking' screen on successful login
        navigation.navigate('Tracking');
      } else {
        // Handle login failure or show an error message
       
      }
    } catch (error) {
      // Handle network errors
     
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Registration')} />
    </View>
  );
};

export default LoginScreen;
