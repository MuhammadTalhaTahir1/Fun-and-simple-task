import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {firebase} from '@react-native-firebase/auth';
import AppTextInput from '../../components/AppTextInput';
import FontSize from '../../../constants/FontSize';
import Spacing from '../../../constants/Spacing';
import Font from '../../../constants/Font';
import Colors from '../../../constants/Colors';
import axios from 'axios';

const {height, width} = Dimensions.get('window');

const SignupScreen = ({navigation}) => {
  const validateEmailWithKickbox = async email => {
    const API_KEY =
      'live_a754bdc55b68e1f7251f8fa51ea5ae278bb90d15ccfd0e6d79ab6b4430b91b2c'; // Replace with your actual API key
    const url = `https://api.kickbox.com/v2/verify?email=${email}&apikey=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const {result, reason} = response.data;

      // Check if the email is valid and not temporary
      if (result === 'deliverable' && reason !== 'disposable') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Email validation error:', error);
      return false;
    }
  };
  // Password validation errors are combined in Yup object
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .matches(/[A-Z]/, 'At least one uppercase letter')
      .matches(/[a-z]/, 'At least one lowercase letter')
      .matches(/\d/, 'At least one number')
      .matches(/[\W_]/, 'At least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignup = async values => {
    const {email, password} = values;
    // Validate email with Kickbox API
    const isValidEmail = await validateEmailWithKickbox(email);
    if (!isValidEmail) {
      alert('Please provide a valid and non-temporary email address');
      return; // Stop signup process if email is invalid
    }
    try {
      // Create a new user with email and password
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      navigation.replace('HomeTabs'); // Navigate to the home screen after successful signup
    } catch (error) {
      console.error('Signup error:', error.message);
      alert(error.message); // Display error message
    }
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
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
                Create account
              </Text>
              <Text
                style={{
                  fontFamily: Font['poppins-regular'],
                  fontSize: FontSize.small,
                  maxWidth: '80%',
                  textAlign: 'center',
                }}>
                Create an account so you can explore all the existing jobs
              </Text>
            </View>
            <View
              style={{
                marginVertical: Spacing * 3,
              }}>
              {/* Full Name Field */}
              <AppTextInput
                placeholder="Full Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              {/* Email Field */}
              <AppTextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              {/* Password Field */}
              <AppTextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                autoCapitalize="none"
              />
              {/* Show all password errors together */}
              {touched.password && (
                <View>
                  {errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>
              )}

              {/* Confirm Password Field */}
              <AppTextInput
                placeholder="Confirm Password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
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
                Sign up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
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
                Already have an account
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  signInLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
