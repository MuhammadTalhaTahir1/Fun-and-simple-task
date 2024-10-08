import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../src/screens/Home';
import UploadPicture from '../src/screens/UploadPicture';
import TextScreen from '../src/screens/TextScreen';
import CalculatorScreen from '../src/screens/CalculatorScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
      sceneContainerStyle={{backgroundColor: '#f0f0f5'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeBackground : null,
              ]}>
              <Icon
                name="home"
                size={20}
                color={focused ? '#007AFF' : '#8e8e93'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="UploadPicture"
        component={UploadPicture}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeBackground : null,
              ]}>
              <Icon
                name="camera"
                size={20}
                color={focused ? '#007AFF' : '#8e8e93'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Text"
        component={TextScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeBackground : null,
              ]}>
              <Icon
                name="pencil"
                size={20}
                color={focused ? '#007AFF' : '#8e8e93'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CalculatorTab"
        component={CalculatorScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeBackground : null,
              ]}>
              <Icon
                name="calculator"
                size={20}
                color={focused ? '#007AFF' : '#8e8e93'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20, // Makes sure the background is rounded for each icon
  },
  activeBackground: {
    backgroundColor: '#f1f4ff', // Change this color for the active background
  },
});
