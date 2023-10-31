// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
  
    const user = { email, password };
    console.log(user);

    try {
      const response = await fetch('http://192.168.1.95:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        AsyncStorage.setItem('jwtToken', data.token);
        // Registration was successful, navigate to the login screen
        navigation.navigate('Tracking');
      } else {
        // Registration failed, handle errors and display error messages
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Registration')} />
    </View>
  );
};

export default LoginScreen;
