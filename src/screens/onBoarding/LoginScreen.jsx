import {firebase} from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Sign in the user with email and password
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Navigate to the home screen on successful login
      navigation.replace('HomeTabs'); // Adjust the route name as needed
    } catch (error) {
      // Handle any errors here
      console.error('Login error:', error.message);

      // Display an alert or handle error state
      Alert.alert('Login Error', error.message);
    }
  };
  console.log('Login Screen');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </Text>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  signUpLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
