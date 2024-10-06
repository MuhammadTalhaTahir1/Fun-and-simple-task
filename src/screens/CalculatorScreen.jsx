import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Import the Picker component

const CalculatorScreen = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add'); // Default to 'add' operation
  const [result, setResult] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter First Number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />

      <Text style={styles.label}>Enter Second Number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
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

      <Button title="Calculate" onPress={() => {}} />

      {result !== null && <Text style={styles.result}>Result: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
});

export default CalculatorScreen;
