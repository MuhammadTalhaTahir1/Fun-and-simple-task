import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../src/screens/Home';
import UploadPicture from '../src/screens/UploadPicture';
import TextScreen from '../src/screens/TextScreen';
import CalculatorScreen from '../src/screens/CalculatorScreen';

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
              <Text style={focused ? styles.textActive : styles.textInactive}>
                🏠
              </Text>
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
              <Text style={focused ? styles.textActive : styles.textInactive}>
                📷
              </Text>
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
              <Text style={focused ? styles.textActive : styles.textInactive}>
                ✍️
              </Text>
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
              <Text style={focused ? styles.textActive : styles.textInactive}>
                ✍️
              </Text>
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
    backgroundColor: '#1F41BB', // Change this color for the active background
  },
  textActive: {
    fontSize: 18,
    color: '#007AFF',
  },
  textInactive: {
    fontSize: 16,
    color: '#8e8e93',
  },
});
