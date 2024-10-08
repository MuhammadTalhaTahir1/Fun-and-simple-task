import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  Text,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Spacing from '../../constants/Spacing';
import Colors from '../../constants/Colors';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';

// Function to request camera permission
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// Function to request storage permission
const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const UploadPicture = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileName = 'your_image_file_name.jpg'; // Use a consistent file name

  useEffect(() => {
    console.log('useeffect running of picture upload ');
    const fetchImage = async () => {
      try {
        const url = await storage().ref(fileName).getDownloadURL();
        setImageUri(url);
      } catch (error) {
        // If the image is not found, we can ignore the error
        if (error.code !== 'storage/object-not-found') {
          console.log('Error fetching image: ', error);
        }
      }
    };

    fetchImage();
  }, []); // Runs only once when the component mounts

  // Function to upload image to Firebase Storage
  const uploadImage = async uri => {
    const reference = storage().ref(fileName);
    setUploading(true);

    try {
      // Check if the image already exists
      await reference.getDownloadURL();
      // If we reach here, it means the image exists, so we delete it
      await reference.delete();
    } catch (error) {
      // If the error is 'object-not-found', it means the image does not exist
      if (error.code !== 'storage/object-not-found') {
        console.log('Error deleting previous image: ', error);
      }
    }

    // Now upload the new image
    try {
      await reference.putFile(uri);
      const url = await reference.getDownloadURL();
      Alert.alert('Success', 'Image uploaded successfully!', [{text: 'OK'}]);
      setImageUri(url); // Set the image URL for display
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  // Function to select image from gallery
  const selectImageFromGallery = async () => {
    const cameraPermission = await requestCameraPermission();
    const storagePermission = await requestStoragePermission();

    if (!cameraPermission || !storagePermission) {
      Alert.alert(
        'Permissions not granted',
        'Cannot access gallery or camera.',
      );
      return;
    }

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        uploadImage(response.assets[0].uri);
      } else {
        console.log('No image selected');
      }
    });
  };

  // Function to take a photo using the camera
  const takePhotoWithCamera = async () => {
    const cameraPermission = await requestCameraPermission();
    const storagePermission = await requestStoragePermission();

    if (!cameraPermission || !storagePermission) {
      Alert.alert('Permissions not granted', 'Cannot access camera.');
      return;
    }

    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        uploadImage(response.assets[0].uri);
      } else {
        console.log('No image taken');
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* <Button
          title={imageUri ? 'Replace using Gallery' : 'Select from Gallery'}
          onPress={selectImageFromGallery}
        /> */}

      <TouchableOpacity
        onPress={selectImageFromGallery}
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.primary,
          marginVertical: Spacing * 3,
          borderRadius: Spacing,
        }}>
        <Text
          style={{
            fontFamily: Font['poppins-bold'],
            color: Colors.onPrimary,
            textAlign: 'center',
            fontSize: FontSize.large,
          }}>
          {imageUri ? 'Replace using Gallery' : 'Select from Gallery'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={takePhotoWithCamera}
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.primary,
          marginVertical: Spacing * 3,
          borderRadius: Spacing,
        }}>
        <Text
          style={{
            fontFamily: Font['poppins-bold'],
            color: Colors.onPrimary,
            textAlign: 'center',
            fontSize: FontSize.large,
          }}>
          {imageUri ? 'Replace via Camera' : 'Take Photo'}
        </Text>
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="medium" color="#1F41BB" />}
      {uploading && <Text>Uploading...</Text>}

      {imageUri && (
        <Image
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default UploadPicture;
