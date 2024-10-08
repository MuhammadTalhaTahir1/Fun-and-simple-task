import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AppTextInput from '../components/AppTextInput';
import Colors from '../../constants/Colors';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';

const CalculatorScreen = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    try {
      const response = await fetch(
        'https://peaceful-harbor-69270-b20b7c4c3c9b.herokuapp.com/calculate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            num1: parseFloat(num1),
            num2: parseFloat(num2),
            operation: operation,
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
        setError('');
      } else {
        setError(data.error || 'Error performing calculation');
      }
    } catch (err) {
      setError('Error connecting to API');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter First Number:</Text>

      <AppTextInput
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Enter Second Number:</Text>

      <AppTextInput
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Choose Operation:</Text>
      <Picker
        selectedValue={operation}
        style={styles.picker}
        onValueChange={itemValue => setOperation(itemValue)}>
        <Picker.Item label="Addition" value="add" />
        <Picker.Item label="Subtraction" value="subtract" />
        <Picker.Item label="Multiplication" value="multiply" />
      </Picker>

      <TouchableOpacity
        onPress={handleCalculate}
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
          CALCULATE
        </Text>
      </TouchableOpacity>

      {result !== null && <Text style={styles.result}>Result: {result}</Text>}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    // justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 18,
  },
});

export default CalculatorScreen;
