import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    const getSavedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');

        if (savedEmail && savedRememberMe === 'true') {
          setEmail(savedEmail);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Failed to fetch the email from storage:', error);
      }
    };

    getSavedEmail();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.208:5003/api/auth/login', { email, password });
      alert(response.data.message);
      
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('rememberMe');
      }

      navigation.navigate('Home', { email });
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        accessibilityLabel="Email input"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        accessibilityLabel="Password input"
      />
      <View style={styles.switchContainer}>
        <Text>Remember Me</Text>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
        />
      </View>

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffcc',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;