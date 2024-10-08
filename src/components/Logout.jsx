// CustomHeader.jsx
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

const Logout = ({title, navigation}) => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User logged out successfully');
      navigation.replace('Login');
      alert('Logout Successfully!');
    } catch (error) {
      console.error('Error signing out: ', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2, // Add shadow
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Logout;
