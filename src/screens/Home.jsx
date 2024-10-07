import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Notification from '../components/Notification';
import Logout from '../components/Logout';

const Home = ({navigation}) => {
  console.log('Home Screen');

  return (
    <View style={styles.container}>
      <View style={styles.logoutButtonContainer}>
        <Logout navigation={navigation} />
      </View>
      <Notification />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the View takes up the full screen
    justifyContent: 'center', // Center the Notification component
    alignItems: 'center', // Center the Notification component horizontally
  },
  logoutButtonContainer: {
    position: 'absolute', // Position the Logout button absolutely
    top: 40, // Adjust as needed
    right: 20, // Adjust as needed
  },
});
