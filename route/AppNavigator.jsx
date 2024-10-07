import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../src/screens/onBoarding/LoginScreen';
import SignupScreen from '../src/screens/onBoarding/SignupScreen';
import {firebase} from '@react-native-firebase/auth';
import TabNavigator from './TabNavigator';
import LoadingScreen from '../src/screens/onBoarding/LoadingScreen';
import WelcomeScreen from '../src/screens/onBoarding/WelcomeScreen';
import Home from '../src/screens/Home';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false); // Set initializing to false
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, [initializing, user]);

  if (initializing) return null; // Render nothing while checking auth state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={WelcomeScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}

        {/* {user ? (
          <Stack.Screen name="HomeTabs" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
