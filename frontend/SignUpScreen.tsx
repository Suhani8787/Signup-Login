import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import zxcvbn from 'zxcvbn';
import axios from 'axios';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.208:5003/api/auth/signup', {
        email,
        password,
      });
      alert(response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      setErrorMessage('Error signing up');
      console.error("Sign up error:", error);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const result = zxcvbn(text);
    setPasswordStrength(result.score === 4 ? 'Strong' : result.score === 3 ? 'Medium' : 'Weak');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
        accessibilityLabel="Email input"
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Enter password"
        secureTextEntry
        accessibilityLabel="Password input"
      />
      <Text>Password Strength: {passwordStrength}</Text>

      <Text>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        placeholder="Confirm password"
        secureTextEntry
        accessibilityLabel="Confirm Password input"
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <Button title="Sign Up" onPress={handleSignUp} />

      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
      />
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
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SignUpScreen;