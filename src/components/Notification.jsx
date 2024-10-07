import React from 'react';
import {Button, View} from 'react-native';
import notifee from '@notifee/react-native';

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
      <Button title="Press me" onPress={onDisplayNotification} />
    </View>
  );
};

export default Notification;

// const styles = StyleSheet.create({});
