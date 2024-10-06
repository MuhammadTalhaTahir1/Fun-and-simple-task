import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const TextScreen = () => {
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState([]);
  const userId = auth().currentUser?.uid;

  // Fetch messages from Firestore
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('messages')
      .doc(userId)
      .collection('messages') // Changed to directly add documents to userId
      .orderBy('createdAt', 'asc') // Sort messages by timestamp
      .onSnapshot(
        snapshot => {
          const fetchedMessages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(fetchedMessages);
        },
        error => {
          Alert.alert('Error', 'Failed to load messages. Please try again.');
        },
      );

    return () => unsubscribe();
  }, [userId]);

  const sendMessage = async () => {
    if (textInput.trim().length === 0) {
      Alert.alert('Validation', 'Please enter a message before sending.');
      return;
    }

    try {
      await firestore()
        .collection('messages')
        .doc(userId)
        .collection('messages')
        .add({
          text: textInput,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setTextInput('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  const formatTimestamp = timestamp => {
    if (!timestamp) return ''; // Return an empty string if timestamp is missing
    const date = timestamp.toDate ? timestamp.toDate() : timestamp; // Only call toDate() if it's a Timestamp object
    return date ? date.toLocaleString() : '';
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={setTextInput}
        placeholder="Type your message here..."
        maxLength={200} // Optional message length limit
      />
      <Button title="Send" onPress={sendMessage} />
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {item.createdAt ? formatTimestamp(item.createdAt) : 'Sending...'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  messageContainer: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default TextScreen;
