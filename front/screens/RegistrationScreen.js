import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegistration = async () => {
    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    const user = { name, email, password, cpassword };
    console.log(user);

    try {
      const response = await fetch('http://192.168.1.95:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      if (response.ok) {
        // Registration was successful, navigate to the login screen
        navigation.navigate('Login');
      } else {
        // Registration failed, handle errors and display error messages
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput
        placeholder="Confirm Password"
        value={cpassword}
        onChangeText={setCpassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegistration} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegistrationScreen;
