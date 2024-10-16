import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../src/screens/onBoarding/LoginScreen';
import SignupScreen from '../src/screens/onBoarding/SignupScreen';
import {firebase} from '@react-native-firebase/auth';
import TabNavigator from './TabNavigator';
import WelcomeScreen from '../src/screens/onBoarding/WelcomeScreen';

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
  }, [initializing]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Show a loading indicator while checking auth state
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="HomeTabs" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Loading" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
