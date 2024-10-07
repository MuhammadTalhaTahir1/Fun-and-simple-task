// src/screens/LoadingScreen.jsx
import {firebase} from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingScreen = ({navigation}) => {
  console.log('Loading Screen ');
  useEffect(() => {
    const checkUser = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('HomeTabs'); // If logged in, navigate to HomeTabs
      } else {
        navigation.replace('Login'); // If not logged in, navigate to Login
      }
    });

    return checkUser; // Unsubscribe on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6200EE" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
