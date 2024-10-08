import React from 'react';
import {Button, TouchableOpacity, Text, View} from 'react-native';
import notifee from '@notifee/react-native';
import Spacing from '../../constants/Spacing';
import Colors from '../../constants/Colors';
import Font from '../../constants/Font';
import FontSize from '../../constants/FontSize';

const Notification = () => {
  async function onDisplayNotification() {
    // Get the current time
    const currentTime = new Date().toLocaleTimeString();
    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      // No custom sound specified; it will use the default system sound
    });

    // Display a notification with the default sound
    await notifee.displayNotification({
      title: 'Hey',
      body: `You pressed me at ${currentTime}`,
      android: {
        channelId: 'default',
        // No need to specify sound for default; just remove this line
      },
      ios: {
        // No need to specify sound for default;
      },
    });
  }
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <TouchableOpacity
        onPress={onDisplayNotification}
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.primary,
          marginVertical: Spacing * 3,
          borderRadius: Spacing,
          shadowColor: Colors.primary,
          shadowOffset: {
            width: 0,
            height: Spacing,
          },
          shadowOpacity: 0.3,
          shadowRadius: Spacing,
        }}>
        <Text
          style={{
            fontFamily: Font['poppins-bold'],
            color: Colors.onPrimary,
            textAlign: 'center',
            fontSize: FontSize.large,
          }}>
          Press Me
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notification;

// const styles = StyleSheet.create({});
