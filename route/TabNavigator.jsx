import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../src/screens/Home';
import UploadPicture from '../src/screens/UploadPicture';
import TextScreen from '../src/screens/TextScreen';
import CalculatorScreen from '../src/screens/CalculatorScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="UploadPicture" component={UploadPicture} />
      <Tab.Screen name="Text" component={TextScreen} />
      <Tab.Screen name="CalculatorTab" component={CalculatorScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
