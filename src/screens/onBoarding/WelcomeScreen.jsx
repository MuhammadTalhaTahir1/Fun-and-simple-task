import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import FontSize from '../../../constants/FontSize';
import Spacing from '../../../constants/Spacing';
import Font from '../../../constants/Font';
import Colors from '../../../constants/Colors';
const {height, width} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  console.log('welcome screen');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="contain"
          source={require('../../../assets/images/welcome-img.png')}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Hello There ! Lets's get started</Text>

        <Text style={styles.subtitle}>
          Just create an account or login if you already have and lets start
          this
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.registerButton}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: height * 0.4, // 40% of the screen height
    width: '100%',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: width * 0.1, // 10% of the screen width
    paddingTop: height * 0.05, // 5% of the screen height
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.xxLarge,
    color: Colors.primary,
    fontFamily: Font['poppins-bold'],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.small,
    color: Colors.text,
    fontFamily: Font['poppins-regular'],
    textAlign: 'center',
    marginTop: height * 0.02, // 2% of the screen height
  },
  buttonContainer: {
    paddingHorizontal: width * 0.05, // 5% of the screen width
    paddingTop: height * 0.08, // 8% of the screen height
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: height * 0.02, // 2% of the screen height
    width: '48%',
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  registerButton: {
    paddingVertical: height * 0.02, // 2% of the screen height
    width: '48%',
    borderRadius: Spacing,
  },
  buttonText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.onPrimary,
    fontSize: FontSize.large,
    textAlign: 'center',
  },
  registerText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.text,
    fontSize: FontSize.large,
    textAlign: 'center',
  },
});
