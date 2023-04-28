import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppStyles from './src/AppStyles';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.header}>Plant Tracker</Text>
        </View>

        <Pressable style={[styles.button, { backgroundColor: 'black' }]}>
          <Text style={[AppStyles.text, { color: 'white' }]}>Continue with Apple</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: '#1877f2' }]}>
          <Text style={[AppStyles.text, { color: 'white' }]}>Continue with Facebook</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: 'white' }]}>
          <Text style={[AppStyles.text, { color: 'black' }]}>Continue with Google</Text>
        </Pressable>

        <Text style={[AppStyles.text, {margin: 10}]}>or</Text>

        <Pressable style={[styles.button, { backgroundColor: '#3ddc84' }]}>
          <Text style={[AppStyles.text, { color: 'black' }]}>Download Android App</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    margin: 20,
  },
  header: {
    ...AppStyles.text,
    fontSize: 24,
  },
  button: {
    padding: 15,
    textAlign: 'center',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    width: 500,
  },
});

export default App;
