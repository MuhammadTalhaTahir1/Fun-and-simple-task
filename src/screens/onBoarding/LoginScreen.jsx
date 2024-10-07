import {firebase} from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import FontSize from '../../../constants/FontSize';
import Spacing from '../../../constants/Spacing';
import Font from '../../../constants/Font';
import AppTextInput from '../../components/AppTextInput';
import Colors from '../../../constants/Colors';

const {height, width} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Forgot password state
  const [forgotEmail, setForgotEmail] = useState(''); // Forgot email state

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return; // Exit the function if validation fails
    }

    try {
      // Sign in the user with email and password
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Navigate to the home screen on successful login
      navigation.replace('HomeTabs'); // Adjust the route name as needed
    } catch (error) {
      // Handle any errors here
      console.error('Login error:', error.message);

      // Display an alert or handle error state
      Alert.alert('Login Error', error.message);
    }
  };
  const handleForgotPassword = async () => {
    // Simple regex to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!forgotEmail || !emailPattern.test(forgotEmail)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      // If sign-in is successful, send the password reset email
      await firebase
        .auth()
        .sendPasswordResetEmail(forgotEmail)
        .then(() => {
          Alert.alert(
            'Check Your Email',
            'A password reset link has been sent to your email if it is associated with an account.',
          );
          setIsForgotPassword(false); // Go back to login after success
        });
    } catch (error) {
      // Handle errors here
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email address.');
      } else {
        console.error('Forgot Password Error:', error.message);
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font['poppins-bold'],
              marginVertical: Spacing * 3,
            }}>
            {isForgotPassword ? 'Reset Password' : 'Login here'}
          </Text>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              fontSize: FontSize.large,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            {isForgotPassword
              ? 'Enter your email to reset your password.'
              : "Welcome back, you've been missed!"}
          </Text>
        </View>

        {isForgotPassword ? (
          <View style={{marginVertical: Spacing * 3}}>
            <AppTextInput
              placeholder="Enter your email"
              value={forgotEmail}
              onChangeText={setForgotEmail}
            />
            <TouchableOpacity
              onPress={handleForgotPassword}
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
                Reset Password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsForgotPassword(false)} // Go back to login
              style={{
                padding: Spacing,
              }}>
              <Text
                style={{
                  fontFamily: Font['poppins-semiBold'],
                  color: Colors.text,
                  textAlign: 'center',
                  fontSize: FontSize.small,
                }}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginVertical: Spacing * 3}}>
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
              <Text
                style={{
                  fontFamily: Font['poppins-semiBold'],
                  fontSize: FontSize.small,
                  color: Colors.primary,
                  alignSelf: 'flex-end',
                }}>
                Forgot your password ?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
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
                Sign in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={{
                padding: Spacing,
              }}>
              <Text
                style={{
                  fontFamily: Font['poppins-semiBold'],
                  color: Colors.text,
                  textAlign: 'center',
                  fontSize: FontSize.small,
                }}>
                Create new account
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
