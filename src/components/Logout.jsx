// LogoutButton.jsx
import React from 'react';
import {View, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
const Logout = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User logged out successfully');
      // Navigate to login screen
      navigation.replace('Login');
      alert('Logout Successfully!');
    } catch (error) {
      console.error('Error signing out: ', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={{marginRight: 20}}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Logout;
