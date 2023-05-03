import React, { useContext } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppStyles from '../AppStyles';
import { AppButton } from '../components/AppButton';
import { AppContext, Page } from '../model/AppContext';

export function StartPage(): JSX.Element {

  const { setPage } = useContext(AppContext)!;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <ImageBackground source={require('../assets/background.png')} resizeMode='repeat' style={styles.background}>

          <View style={styles.header}>
            <Image source={require('../assets/logo.png')} style={styles.header.icon} />
            <Text style={styles.header.text}>Plant Tracker</Text>
          </View>

          <AppButton backgroundColor='#1877f2' textColor='white' iconBlob={require('../assets/icon-fb.png')}
            label='Continue with Facebook' onClick={() => setPage(Page.Home)} />
          <AppButton backgroundColor='white' textColor='black' hoverBackgroundColor='#efefef' iconBlob={require('../assets/icon-google.png')}
            label='Continue with Google' onClick={() => setPage(Page.Home)} />
          <Text style={[AppStyles.text, {margin: 10}]}>or</Text>
          <AppButton backgroundColor='#3ddc84' textColor='black' iconBlob={require('../assets/icon-android.png')}
            label='Download Android App' onClick={() => setPage(Page.Home)} />

        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#afffba',
  },
  header: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    icon: {
      width: 70,
      height: 70
    },
    text: {
      ...AppStyles.text,
      fontSize: 36,
    },
  },
});
